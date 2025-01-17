import { getTeam } from '@@/server/database/queries/teams'
import { z } from 'zod'
import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import {
  createStripeCustomer,
  createCheckoutLink,
} from '@@/server/services/stripe'
import {
  getTeamSubscription,
  createSubscription,
} from '@@/server/database/queries/subscriptions'
import { SubscriptionStatus } from '@@/constants'

const querySchema = z.object({
  teamId: z.string().min(1, 'Team ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
  variantId: z.string().min(1, 'Variant ID is required'),
  successUrl: z.string().url(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const query = await getValidatedQuery(event, querySchema.parse)
  const teamId = query.teamId
  const team = await getTeam(teamId)
  await validateTeamOwnership(event, teamId)

  const existingSubscription = await getTeamSubscription(teamId)
  if (existingSubscription) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team already has a subscription',
    })
  }
  const customer = await createStripeCustomer(user.email, user.id)

  await createSubscription({
    teamId: query.teamId,
    planId: query.planId,
    variantId: query.variantId,
    customerId: customer.id,
    status: SubscriptionStatus.PENDING,
    paymentProvider: 'stripe',
    nextPaymentDate: new Date(),
  })

  const checkoutSession = await createCheckoutLink(
    customer.id,
    query.successUrl,
  )
  return checkoutSession
})
