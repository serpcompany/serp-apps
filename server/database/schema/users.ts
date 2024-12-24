import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatarUrl'),
  hashedPassword: text('hashedPassword'),
  banned: integer('banned', { mode: 'boolean' }).notNull().default(false),
  bannedReason: text('bannedReason'),
  emailVerified: integer('emailVerified', { mode: 'boolean' })
    .notNull()
    .default(false),
  phoneNumber: text('phoneNumber').unique(),
  bannedUntil: integer('bannedUntil', { mode: 'timestamp' }),
  onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
  // User Preferences
  lastSelectedTeamId: text('lastSelectedTeamId'),
  theme: text('theme').default('system'),
  emailNotifications: integer('emailNotifications', {
    mode: 'boolean',
  }).default(true),
  pushNotifications: integer('pushNotifications', { mode: 'boolean' }).default(
    true,
  ),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  lastActive: integer('last_active', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})
