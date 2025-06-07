import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  description: text('description'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  image: text('image'),
  metadata: text('metadata', { mode: 'json' }).$type<Record<string, string>>().notNull(),
  product_orders: integer('product_orders', { mode: 'number' })
    .notNull()
    .default(0),
  features: text('features', { mode: 'json' }).$type<{ name?: string }[]>().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$onUpdate(
    () => new Date(),
  ),
})
