import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { SubscriptionStatus } from '../../../constants'
import { teams } from './teams'

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  customerId: text('customerId').notNull(),
  status: text('status').notNull().default(SubscriptionStatus.TRIALING),
  planId: text('planId').notNull(),
  variantId: text('variantId').notNull(),
  paymentProvider: text('paymentProvider').notNull(),
  nextPaymentDate: integer('nextPaymentDate', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const stripeCustomers = sqliteTable('stripe_customers', {
  id: text('id').primaryKey(),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const stripeWebhookEvents = sqliteTable('stripe_webhook_events', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  eventData: text('eventData', { mode: 'json' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
})
