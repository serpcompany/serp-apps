import { getSubscriptionByUserId } from '@@/server/database/queries/subscriptions'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const subscription = await getSubscriptionByUserId(user.id)
  return subscription
})
