import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { OneTimePasswordTypes } from '../../../constants'
import { users } from './users'

export const oauthAccounts = sqliteTable('oauth_accounts', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  providerId: text('providerId').notNull(),
  providerUserId: text('providerUserId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const emailVerificationCodes = sqliteTable('email_verification_codes', {
  id: integer('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code', { length: 32 }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export const passwordResetTokens = sqliteTable('password_reset_tokens', {
  id: integer('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  code: text('code', { length: 32 }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export const oneTimePasswords = sqliteTable('one_time_passwords', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  identifier: text('identifier').notNull(),
  code: text('code', { length: 6 }).notNull(),
  type: text('type').notNull().default(OneTimePasswordTypes.signup),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})
