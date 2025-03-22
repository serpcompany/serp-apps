import { eq } from 'drizzle-orm'
import type { InsertProduct, InsertPrice } from '@@/types/database'

export const createOrUpdateStripeProduct = async (payload: InsertProduct) => {
  const product = await useDB()
    .insert(tables.products)
    .values(payload)
    .onConflictDoUpdate({
      target: [tables.products.id],
      set: payload,
    })
    .returning()
    .get()
  return product
}

export const createOrUpdateStripePrice = async (payload: InsertPrice) => {
  const price = await useDB()
    .insert(tables.prices)
    .values(payload)
    .onConflictDoUpdate({
      target: [tables.prices.id],
      set: payload,
    })
    .returning()
    .get()
  return price
}

export const getAllPlans = async () => {
  const plans = await useDB().query.prices.findMany({
    with: {
      product: true,
    },
    orderBy: (prices, { asc }) => [asc(prices.unitAmount)],
  })
  return plans
}
