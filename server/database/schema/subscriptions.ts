import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { SubscriptionStatus } from '../../../constants'
import { users } from './users'

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  customerId: text('customerId').notNull(),
  status: text('status').notNull().default(SubscriptionStatus.TRIALING),
  planId: text('planId').notNull(),
  variantId: text('variantId').notNull(),
  paymentProvider: text('paymentProvider').notNull(),
  nextPaymentDate: integer('nextPaymentDate', { mode: 'timestamp' }).notNull(),
})
