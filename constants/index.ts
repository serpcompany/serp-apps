export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum SubscriptionStatus {
  TRIALING = 'TRIALING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  UNPAID = 'UNPAID',
  INCOMPLETE = 'INCOMPLETE',
  EXPIRED = 'EXPIRED',
}

export enum OneTimePasswordTypes {
  signup = 'SIGNUP',
  login = 'LOGIN',
  forgotPassword = 'FORGOT_PASSWORD',
}
