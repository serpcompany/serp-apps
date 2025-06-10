import { getUserCreditHistory } from '@@/server/database/queries/credits'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 25

  try {
    return await getUserCreditHistory(user.id, page, limit)
  } catch (e) {
    console.error('Failed to fetch credit history:', e)
    throw createError({ statusCode: 500, statusMessage: 'Could not fetch credits history' })
  }
})
