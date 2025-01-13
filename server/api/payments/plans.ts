import { getAllPlans } from '@@/server/services/stripe'

export default defineEventHandler(async () => {
  return await getAllPlans()
})
