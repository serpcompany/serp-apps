import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

import { users } from './users'

export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$onUpdate(
    () => new Date(),
  ),
})
