export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const userCount = await useDB().$count(tables.users)
  const feedbackCount = await useDB().$count(tables.feedback)
  return {
    users: userCount,
    feedback: feedbackCount,
  }
})
