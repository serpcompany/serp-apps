import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { oauthAccounts } from './auth'
import { relations } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$default(() => nanoid()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatarUrl').default(''),
  hashedPassword: text('hashedPassword'),
  banned: integer('banned', { mode: 'boolean' }).notNull().default(false),
  bannedReason: text('bannedReason'),
  emailVerified: integer('emailVerified', { mode: 'boolean' })
    .notNull()
    .default(false),
  superAdmin: integer('superAdmin', { mode: 'boolean' })
    .notNull()
    .default(false),
  phoneNumber: text('phoneNumber'),
  bannedUntil: integer('bannedUntil', { mode: 'timestamp' }),
  onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
  proAccount: integer('proAccount', { mode: 'boolean' })
    .notNull()
    .default(false),
  credits: integer('credits').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$onUpdate(
    () => new Date(),
  ),
  lastActive: integer('last_active', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const usersRelations = relations(users, ({ many }) => ({
  oauthAccounts: many(oauthAccounts),
}))
