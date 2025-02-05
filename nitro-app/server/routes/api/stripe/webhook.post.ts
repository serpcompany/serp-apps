import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const body = await readRawBody(event, 'utf-8')
  const stripeSignature = getHeader(event, 'stripe-signature')
  let stripeEvent: Stripe.Event
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      stripeSignature,
      webhookSecret,
    )
  } catch (err) {
    console.log('err', err)
    throw createError({
      statusCode: 400,
      statusMessage: 'Webhook Error',
      message: err instanceof Error ? err.message : 'Unknown error',
    })
  }
  const type = stripeEvent.type
  const data = stripeEvent.data.object
  return {
    type,
    data,
  }
})
