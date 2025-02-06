import { getAllPlans } from '@@/server/database/queries/stripe'

export default defineEventHandler(async (event) => {
  const plans = await getAllPlans()
  return plans
})
