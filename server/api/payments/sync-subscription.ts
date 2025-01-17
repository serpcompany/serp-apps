import { z } from 'zod'
import { getAllSubscriptions } from '@@/server/services/stripe'

import { getStripeCustomer } from '@@/server/database/queries/subscriptions'
const querySchema = z.object({
  teamId: z.string().min(1, 'Team ID is required'),
})

export default defineEventHandler(async (event) => {
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
  return subscriptions
})
