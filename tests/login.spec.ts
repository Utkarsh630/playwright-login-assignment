import  {test, expect}  from "../fixtures/test-fixtures";
import { credentials } from "../test-data/credentials";

test.describe("Practice Test Automation - Login", () => {

  // Positive scenarios
  test("TC01 - login with valid username and password", async ({ loginPage }) => {
    await loginPage.login(
      credentials.valid.username,
      credentials.valid.password,
    );
    await loginPage.expectSuccessfulLogin();
  });

  test("TC02 - successful login redirects to the correct URL", async ({ loginPage, page }) => {
    await loginPage.login(
      credentials.valid.username,
      credentials.valid.password,
    );
    await expect(page).toHaveURL(/logged-in-successfully/);
  });

  test("TC03 - password field masks the entered password", async ({ loginPage }) => {
    await loginPage.enterCredentials(
      credentials.valid.username,
      credentials.valid.password,
    );
    await expect(loginPage.password).toHaveAttribute("type", "password");
  });

  test("TC04 - Submit button is enabled after entering credentials", async ({loginPage}) => {
  await loginPage.enterCredentials(
    credentials.valid.username,
    credentials.valid.password,
  );

  await loginPage.expectSubmitButtonEnabled();
});

  test("TC05 - user can log out after successful login", async ({ loginPage, page }) => {
    await loginPage.login(
      credentials.valid.username,
      credentials.valid.password,
    );
    await loginPage.logout();
    await expect(page).toHaveURL(/practice-test-login/);
    await expect(loginPage.username).toBeVisible();
  });

  // Negative scenarios
  test("TC06 - invalid username with valid password is rejected", async ({ loginPage }) => {
    await loginPage.login(
      credentials.invalidUsername.username,
      credentials.invalidUsername.password,
    );
    await loginPage.expectLoginError("Your username is invalid!");
  });

  test("TC07 - valid username with invalid password is rejected", async ({ loginPage }) => {
    await loginPage.login(
      credentials.invalidPassword.username,
      credentials.invalidPassword.password,
    );
    await loginPage.expectLoginError("Your password is invalid!");
  });

  test("TC08 - submitting both fields empty is prevented", async ({ loginPage,  page }) => {
    await loginPage.login(
      credentials.empty.username,
      credentials.empty.password,
    );
    await expect(page).toHaveURL(/practice-test-login/);
    await loginPage.expectLoginError("Your username is invalid!");
  });

  test("TC09 - submitting a password without a username is prevented", async ({ loginPage,
    page,
  }) => {
    await loginPage.login(
      credentials.passwordOnly.username,
      credentials.passwordOnly.password,
    );
    await expect(page).toHaveURL(/practice-test-login/);
    await loginPage.expectLoginError("Your username is invalid!");
  });

  test("TC10 - username with leading and trailing spaces is rejected", async ({ loginPage }) => {
    await loginPage.login(
      credentials.leadingTrailingSpaces.username,
      credentials.leadingTrailingSpaces.password,
    );
    await loginPage.expectLoginError("Your username is invalid!");
  });
});
