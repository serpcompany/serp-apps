import { isTeamMember } from '@@/server/database/queries/teams'
import { eq } from 'drizzle-orm'
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }
  const hasAccess = await isTeamMember(teamId, user.id)
  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized Access',
    })
  }

  const team = await useDB().query.teamMembers.findMany({
    where: eq(tables.teamMembers.teamId, teamId),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  })

  return team
})
