import { customAlphabet, nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'
import { teams } from './teams'
import { relations } from 'drizzle-orm'

export const generateAlphaNumericCode = (length: number = 6) => {
  return customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    length,
  )()
}
export const urls = sqliteTable('urls', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  shortcode: text('shortcode')
    .notNull()
    .unique()
    .$default(() => generateAlphaNumericCode(6)),
  url: text('url').notNull(),
  comments: text('comments'),
  clicks: integer('clicks').notNull().default(0),
  tags: text('tags', { mode: 'json' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  logo: text('logo'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const urlAnalytics = sqliteTable('url_analytics', {
  id: text('id')
    .primaryKey()
    .$default(() => generateAlphaNumericCode()),
  urlId: text('urlId')
    .notNull()
    .references(() => urls.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  country: text('country'),
  city: text('city'),
  device: text('device'),
  deviceType: text('device_type'),
  os: text('os'),
  browser: text('browser'),
  browserVersion: text('browser_version'),
  referrer: text('referrer'),
  referrerDomain: text('referrer_domain'),
  ip: text('ip'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
})

export const urlsRelations = relations(urls, ({ one }) => ({
  userId: one(users, {
    fields: [urls.userId],
    references: [users.id],
  }),
  teamId: one(teams, {
    fields: [urls.teamId],
    references: [teams.id],
  }),
}))

export const urlAnalyticsRelations = relations(urlAnalytics, ({ one }) => ({
  url: one(urls, {
    fields: [urlAnalytics.urlId],
    references: [urls.id],
  }),
  user: one(users, {
    fields: [urlAnalytics.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [urlAnalytics.teamId],
    references: [teams.id],
  }),
}))
