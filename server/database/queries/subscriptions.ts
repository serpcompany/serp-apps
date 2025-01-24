import { eq } from 'drizzle-orm'
import type {
  InsertSubscription,
  InsertStripeCustomer,
  InsertStripeWebhookEvent,
} from '@@/types/database'

export const createSubscription = async (payload: InsertSubscription) => {
  try {
    const subscription = await useDB()
      .insert(tables.subscriptions)
      .values(payload)
      .returning()
      .get()
    return subscription
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create subscription',
    })
  }
}

export const getTeamSubscription = async (teamId: string) => {
  try {
    const subscription = await useDB()
      .select()
      .from(tables.subscriptions)
      .where(eq(tables.subscriptions.teamId, teamId))
      .get()
    return subscription
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get team subscription',
    })
  }
}

export const updateSubscription = async (
  teamId: string,
  data: Partial<InsertSubscription>,
) => {
  try {
    const subscription = await useDB()
      .update(tables.subscriptions)
      .set(data)
      .where(eq(tables.subscriptions.teamId, teamId))
      .returning()
      .get()
    return subscription
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update subscription',
    })
  }
}

export const createSubscriptionEvent = async (
  eventId: string,
  eventType: string,
  eventPayload: Record<string, any>,
) => {
  try {
    const event = await useDB()
      .insert(tables.subscriptionEvents)
      .values({
        eventId,
        eventType,
        eventPayload,
      })
      .returning()
      .get()
    return event
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create subscription event',
    })
  }
}

export const getStripeCustomer = async (teamId: string) => {
  try {
    const customer = await useDB()
      .select()
      .from(tables.stripeCustomers)
      .where(eq(tables.stripeCustomers.teamId, teamId))
      .get()
    return customer
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get Stripe customer',
    })
  }
}

export const addStripeCustomer = async (payload: InsertStripeCustomer) => {
  try {
    const customer = await useDB()
      .insert(tables.stripeCustomers)
      .values(payload)
      .returning()
      .get()
    return customer
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create Stripe customer',
    })
  }
}

export const addStripeWebhookEvent = async (
  payload: InsertStripeWebhookEvent,
) => {
  try {
    const event = await useDB()
      .insert(tables.stripeWebhookEvents)
      .values(payload)
      .returning()
      .get()
    return event
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create Stripe webhook event',
    })
  }
}
