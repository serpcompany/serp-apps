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
