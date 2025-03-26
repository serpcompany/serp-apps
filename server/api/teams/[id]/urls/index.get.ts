import { isTeamMember } from '@@/server/database/queries/teams'
import { getUrlsByUserId } from '@@/server/database/queries/urls'

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
  const urls = await getUrlsByUserId(user.id, teamId)
  return urls
})
