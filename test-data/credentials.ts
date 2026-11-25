
export const credentials = {
  valid: {
    username: 'student',
    password: 'Password123'
  },

  invalidUsername: {
    username: 'wrongUser',
    password: 'Password123'
  },

  invalidPassword: {
    username: 'student',
    password: 'WrongPassword!'
  },

  empty: {
    username: '',
    password: ''
  },

  passwordOnly: {
    username: '',
    password: 'Password123'
  },

  leadingTrailingSpaces: {
    username: ' student',
    password: ' Password123'
  }
} as const;
