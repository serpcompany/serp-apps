import { nanoid } from 'nanoid'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './users'
import { sql } from 'drizzle-orm'

export const creditsTransactions = sqliteTable('credits_transactions', {
  id: text('id').primaryKey().notNull()
    .$default(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id),
  amount: integer('amount').notNull(),
  type: text('type', { enum: ['purchase', 'usage', 'refund', 'bonus'] }).notNull(),
  description: text('description'),
  stripeSessionId: text('stripe_session_id'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  metadata: text('metadata', { mode: 'json' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})
