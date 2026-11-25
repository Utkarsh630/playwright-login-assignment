import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.errorMessage = page.locator('#error');
    this.successMessage = page.getByRole('heading', { name: 'Logged In Successfully' });
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/practice-test-login/');
  }

  async login(username: string, password: string) : Promise<void> {
    await this.enterCredentials(username, password);
    await this.submitButton.click();
  }

  async expectSuccessfulLogin(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.page).toHaveURL(/logged-in-successfully/);
    await expect(this.logoutButton).toBeVisible();
  }

  async expectLoginError(message?: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    if (message) await expect(this.errorMessage).toContainText(message);
  }

  async expectSubmitButtonEnabled(): Promise<void> {
    await expect(this.submitButton).toBeEnabled();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
}

async enterCredentials(username: string, password: string): Promise<void> {
  await this.username.fill(username);
  await this.password.fill(password); 
}

}