import { z } from 'zod'
import { getTeam } from '@@/server/database/queries/teams'
import {
  getStripeCustomer,
  addStripeCustomer,
} from '@@/server/database/queries/subscriptions'
import {
  createStripeCustomer,
  createCheckoutLink,
} from '@@/server/services/stripe'
import { env } from '~~/env'
const querySchema = z.object({
  teamId: z.string().min(1, 'Team ID is required'),
  variantId: z.string().min(1, 'Variant ID is required'),
})

async function getOrCreateStripeCustomer(teamId: string, email: string) {
  const team = await getTeam(teamId)
  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found',
    })
  }

  let dbCustomer = await getStripeCustomer(teamId)
  if (!dbCustomer) {
    const stripeCustomer = await createStripeCustomer(email, teamId)
    dbCustomer = await addStripeCustomer({
      id: stripeCustomer.id,
      teamId,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  return dbCustomer
}

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const query = await getValidatedQuery(event, querySchema.parse)
  const teamId = query.teamId

  await validateTeamOwnership(event, teamId)

  const customer = await getOrCreateStripeCustomer(teamId, user.email)

  const checkoutSession = await createCheckoutLink(
    customer.id,
    query.variantId,
    `${env.BASE_URL}/dashboard/success`,
  )

  return { success: true, url: checkoutSession.url }
})
