import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'
import { teams } from './teams'
import { relations } from 'drizzle-orm'

export const files = sqliteTable('files', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  pathname: text('pathname').notNull(),
  fileName: text('fileName').notNull(),
  size: integer('size'),
  type: text('type').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const filesRelations = relations(files, ({ one }) => ({
  userId: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
  teamId: one(teams, {
    fields: [files.teamId],
    references: [teams.id],
  }),
}))
