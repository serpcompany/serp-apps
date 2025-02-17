import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { deleteTeamMember } from '@@/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const teamId = getRouterParam(event, 'id')
  const memberId = getRouterParam(event, 'memberId')

  if (!teamId || !memberId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID and member ID are required',
    })
  }
  await validateTeamOwnership(event, teamId)
  await deleteTeamMember(teamId, memberId)
  return {
    message: 'Team member deleted successfully',
  }
})
