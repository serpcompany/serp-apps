import type { tables } from '../server/utils/drizzle'

export type User = typeof tables.users.$inferSelect
export type InsertUser = typeof tables.users.$inferInsert
export type Subscription = typeof tables.subscriptions.$inferSelect
export type InsertSubscription = typeof tables.subscriptions.$inferInsert
export type Waitlist = typeof tables.waitlist.$inferSelect
export type InsertWaitlist = typeof tables.waitlist.$inferInsert
export type OAuthAccounts = typeof tables.oauthAccounts.$inferSelect
export type InsertOAuthAccounts = typeof tables.oauthAccounts.$inferInsert
export type Post = typeof tables.posts.$inferSelect
export type InsertPost = typeof tables.posts.$inferInsert
export type Feedback = typeof tables.feedback.$inferSelect
export type InsertFeedback = typeof tables.feedback.$inferInsert
export type EmailVerificationCodes =
  typeof tables.emailVerificationCodes.$inferSelect
export type InsertEmailVerificationCodes =
  typeof tables.emailVerificationCodes.$inferInsert
export type PasswordResetTokens =
  typeof tables.passwordResetTokens.$inferSelect
export type InsertPasswordResetTokens =
  typeof tables.passwordResetTokens.$inferInsert
export type OneTimePasswords = typeof tables.oneTimePasswords.$inferSelect
export type InsertOneTimePasswords =
  typeof tables.oneTimePasswords.$inferInsert
export type Image = typeof tables.images.$inferSelect
export type InsertImage = typeof tables.images.$inferInsert
