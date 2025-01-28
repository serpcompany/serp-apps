import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { teams } from './teams'

export const subscriptionStatusEnum = [
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete',
  'incomplete_expired',
  'paused',
  'none',
] as const

export const stripeCustomers = sqliteTable('stripe_customers', {
  id: text('id').primaryKey().notNull().unique(),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey().notNull().unique(),
  stripeCustomerId: text('stripeCustomerId')
    .notNull()
    .references(() => stripeCustomers.id, { onDelete: 'cascade' }),
  status: text('status', { enum: subscriptionStatusEnum }).notNull(),
  currentPeriodEnd: integer('current_period_end', {
    mode: 'timestamp',
  }),
  cancelAtPeriodEnd: integer('cancel_at_period_end', {
    mode: 'boolean',
  }),
  currentPeriodStart: integer('current_period_start', {
    mode: 'timestamp',
  }),
  endedAt: integer('ended_at', { mode: 'timestamp' }),
  canceledAt: integer('canceled_at', { mode: 'timestamp' }),
  trialStart: integer('trial_start', { mode: 'timestamp' }),
  trialEnd: integer('trial_end', { mode: 'timestamp' }),
  priceId: text('priceId').notNull(),
  paymentMethodBrand: text('payment_method_brand'),
  paymentMethodLast4: text('payment_method_last4'),
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
  eventId: text('eventId').notNull().unique(),
  eventType: text('event_type').notNull(),
  customerId: text('customer_id').references(() => stripeCustomers.id),
  teamId: text('team_id').references(() => teams.id),
  eventData: text('event_data', { mode: 'json' }).notNull(),
  processedAt: integer('processed_at', { mode: 'timestamp' }),
  processingStatus: text('processing_status', {
    enum: ['pending', 'processed', 'failed'],
  })
    .notNull()
    .default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
})

export const stripeCustomersRelations = relations(stripeCustomers, ({ one, many }) => ({
  team: one(teams, {
    fields: [stripeCustomers.teamId],
    references: [teams.id],
  }),
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  customer: one(stripeCustomers, {
    fields: [subscriptions.stripeCustomerId],
    references: [stripeCustomers.id],
  }),
}));
