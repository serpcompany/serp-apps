import { z } from 'zod'
import { getAllSubscriptions } from '@@/server/services/stripe'
import type { STRIPE_SUB_CACHE } from '@@/types/stripe'
import {
  getStripeCustomer,
  addStripeWebhookEvent,
} from '@@/server/database/queries/subscriptions'
const querySchema = z.object({
  teamId: z.string().min(1, 'Team ID is required'),
})

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const query = await getValidatedQuery(event, querySchema.parse)
  await validateTeamOwnership(event, query.teamId)
  const customer = await getStripeCustomer(query.teamId)
  if (!customer) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Customer not found',
    })
  }

  const subscriptions = await getAllSubscriptions(customer.id)
  if (subscriptions.data.length === 0) {
    const subData = { status: 'none' }
    await addStripeWebhookEvent({
      id: customer.id,
      teamId: query.teamId,
      eventData: subData,
    })
    return subData
  }
  const subscription = subscriptions.data[0]

  const subData: STRIPE_SUB_CACHE = {
    subscriptionId: subscription.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    currentPeriodEnd: subscription.current_period_end,
    currentPeriodStart: subscription.current_period_start,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    paymentMethod:
      subscription.default_payment_method &&
      typeof subscription.default_payment_method !== 'string'
        ? {
            brand: subscription.default_payment_method.card?.brand ?? null,
            last4: subscription.default_payment_method.card?.last4 ?? null,
          }
        : null,
  }

  await addStripeWebhookEvent({
    id: customer.id,
    teamId: query.teamId,
    eventData: subData,
  })
  return subData
})
