import { stripeService } from '@@/server/services/stripe'
import { getCustomerByUserId } from '@@/server/database/queries/customers'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event)

    const customer = await getCustomerByUserId(user.id)
    if (!customer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Customer not found',
      })
    }

    const session = await stripeService.createBillingPortalSession(customer.id)
    return session.url
  } catch (error) {
    if (error instanceof Error) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create billing portal session',
    })
  }
})
