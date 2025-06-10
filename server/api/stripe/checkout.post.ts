import { stripeService } from '@@/server/services/stripe'
import {
  getCustomerByUserId,
  createCustomer,
} from '@@/server/database/queries/customers'

interface CheckoutBody {
  priceId: string
  credits?: number
}

async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const customerRecord = await getCustomerByUserId(userId)
    if (customerRecord) {
      return customerRecord.id
    }

    const newCustomerId = await stripeService.createCustomer(userId, userEmail)
    await createCustomer({
      id: newCustomerId,
      userId,
    })
    return newCustomerId
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get or create customer',
    })
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event)
    const body = await readBody<CheckoutBody>(event)

    if (!body.priceId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Price ID is required',
      })
    }

    const customerId = await getOrCreateCustomer(user.id, user.email)

    const session = await stripeService.createCheckoutSession({
      customerId,
      priceId: body.priceId,
      credits: body.credits,
    })

    return session.url
  } catch (error) {
    // If it's already a handled error, rethrow it
    if (error instanceof Error) throw error

    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create checkout session',
    })
  }
})
