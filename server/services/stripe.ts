import Stripe from 'stripe'
import { env } from '@@/env'
import type { Plan, PlanVariant } from '@@/types/stripe'
export const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export const getAllPlans = async (): Promise<Plan[]> => {
  const response = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })
  const plansMap: Record<string, Plan> = {}

  response.data.forEach((price) => {
    const product = price.product as Stripe.Product

    if (!plansMap[product.id]) {
      plansMap[product.id] = {
        id: product.id,
        name: product.name,
        description: product.description,
        storeId: null,
        marketing_features: product.marketing_features,
        variants: [],
      }
    }

    const variant: PlanVariant = {
      id: price.id,
      interval: price.recurring?.interval ?? 'year',
      interval_count: price.recurring?.interval_count ?? 0,
      price: price.unit_amount ?? 0,
      currency: price.currency,
    }

    plansMap[product.id]!.variants.push(variant)
  })
  // Sort plans by lowest price
  return Object.values(plansMap)
    .filter((plan) => plan.variants.length > 0)
    .sort((a, b) => {
      const lowestPriceA = Math.min(...a.variants.map((v) => v.price))
      const lowestPriceB = Math.min(...b.variants.map((v) => v.price))
      return lowestPriceA - lowestPriceB
    })
}
