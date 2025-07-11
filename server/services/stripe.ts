import { env } from '@@/env'
import Stripe from 'stripe'

export const stripe = new Stripe(env.NUXT_STRIPE_SECRET_KEY)

export interface CreateCheckoutSessionParams {
  customerId: string
  priceId: string
}

export const stripeService = {
  async createCustomer(userId: string, email: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        metadata: { userId },
      })
      return customer.id
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create Stripe customer',
      })
    }
  },

  async createCheckoutSession({ customerId, priceId }: CreateCheckoutSessionParams) {
    try {
      return await stripe.checkout.sessions.create({
        customer: customerId,
        billing_address_collection: 'required',
        customer_update: {
          address: 'auto',
        },
        allow_promotion_codes: true,
        success_url: `${env.BASE_URL}/dashboard/billing?success=true`,
        cancel_url: `${env.BASE_URL}/dashboard/billing?cancel=true`,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
      })
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create checkout session',
      })
    }
  },

  async getCheckoutSession(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      return session
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get checkout session',
      })
    }
  },

  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      return subscription
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get subscription',
      })
    }
  },

  async createBillingPortalSession(customerId: string) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
      })
      return session
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create billing portal session',
      })
    }
  },
}
