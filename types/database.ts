import { tables } from '@@/server/utils/database';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Users
export type User = typeof tables.users.$inferSelect;
export type InsertUser = typeof tables.users.$inferInsert;
export const insertUserSchema = createInsertSchema(tables.users);
export const selectUserSchema = createSelectSchema(tables.users);

// Email Verification Codes
export type EmailVerificationCodes = typeof tables.emailVerificationCodes.$inferSelect;
export type InsertEmailVerificationCodes = typeof tables.emailVerificationCodes.$inferInsert;
export const insertEmailVerificationCodesSchema = createInsertSchema(tables.emailVerificationCodes);
export const selectEmailVerificationCodesSchema = createSelectSchema(tables.emailVerificationCodes);

// One Time Passwords
export type OneTimePasswords = typeof tables.oneTimePasswords.$inferSelect;
export type InsertOneTimePasswords = typeof tables.oneTimePasswords.$inferInsert;
export const insertOneTimePasswordsSchema = createInsertSchema(tables.oneTimePasswords);
export const selectOneTimePasswordsSchema = createSelectSchema(tables.oneTimePasswords);

// Password Reset Tokens
export type PasswordResetTokens = typeof tables.passwordResetTokens.$inferSelect;
export type InsertPasswordResetTokens = typeof tables.passwordResetTokens.$inferInsert;
export const insertPasswordResetTokensSchema = createInsertSchema(tables.passwordResetTokens);
export const selectPasswordResetTokensSchema = createSelectSchema(tables.passwordResetTokens);

// Posts
export type Post = typeof tables.posts.$inferSelect;
export type InsertPost = typeof tables.posts.$inferInsert;
export const insertPostSchema = createInsertSchema(tables.posts);
export const selectPostSchema = createSelectSchema(tables.posts);

// OAuth Accounts
export type OAuthAccount = typeof tables.oauthAccounts.$inferSelect;
export type InsertOAuthAccount = typeof tables.oauthAccounts.$inferInsert;
export const insertOAuthAccountSchema = createInsertSchema(tables.oauthAccounts);
export const selectOAuthAccountSchema = createSelectSchema(tables.oauthAccounts);

// Passkeys
export type Passkey = typeof tables.webAuthnCredentials.$inferSelect;
export type InsertPasskey = typeof tables.webAuthnCredentials.$inferInsert;
export type WebAuthnChallenge = typeof tables.webAuthnChallenges.$inferSelect;
export type InsertWebAuthnChallenge = typeof tables.webAuthnChallenges.$inferInsert;

// Stripe
export type InsertPrice = typeof tables.prices.$inferInsert;
export type Price = typeof tables.prices.$inferSelect;
export const insertPriceSchema = createInsertSchema(tables.prices);
export const selectPriceSchema = createSelectSchema(tables.prices);

export type InsertSubscription = typeof tables.subscriptions.$inferInsert;
export type Subscription = typeof tables.subscriptions.$inferSelect;
export const insertSubscriptionSchema = createInsertSchema(tables.subscriptions);
export const selectSubscriptionSchema = createSelectSchema(tables.subscriptions);

export type InsertCustomer = typeof tables.customers.$inferInsert;
export type Customer = typeof tables.customers.$inferSelect;
export const insertCustomerSchema = createInsertSchema(tables.customers);
export const selectCustomerSchema = createSelectSchema(tables.customers);

export type InsertProduct = typeof tables.products.$inferInsert;
export type Product = typeof tables.products.$inferSelect;
export const insertProductSchema = createInsertSchema(tables.products);
export const selectProductSchema = createSelectSchema(tables.products);

// Admin
export type Feedback = typeof tables.feedback.$inferSelect;
export type InsertFeedback = typeof tables.feedback.$inferInsert;
export const insertFeedbackSchema = createInsertSchema(tables.feedback);
export const selectFeedbackSchema = createSelectSchema(tables.feedback);

export type Subscriber = typeof tables.subscribers.$inferSelect;
export type InsertSubscriber = typeof tables.subscribers.$inferInsert;
export const insertSubscriberSchema = createInsertSchema(tables.subscribers);
export const selectSubscriberSchema = createSelectSchema(tables.subscribers);
