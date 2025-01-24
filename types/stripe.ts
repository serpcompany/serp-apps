import type Stripe from 'stripe'

export interface PlanVariant {
  id: string
  interval: 'day' | 'week' | 'month' | 'year'
  interval_count: number
  price: number
  currency: string
}

export interface Plan {
  id: string
  name: string
  description: string | null
  storeId: string | null
  marketing_features: Stripe.Product.MarketingFeature[]
  variants: PlanVariant[]
}

export type STRIPE_SUB_CACHE =
  | {
      subscriptionId: string | null
      status: Stripe.Subscription.Status
      priceId: string | null
      currentPeriodStart: number | null
      currentPeriodEnd: number | null
      cancelAtPeriodEnd: boolean
      paymentMethod: {
        brand: string | null
        last4: string | null
      } | null
    }
  | {
      status: 'none'
    }
