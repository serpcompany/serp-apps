import { validateTeamOwnership } from '@@/server/utils/teamValidation.ts'
import { findTeamMembers } from '@@/server/database/actions/teams'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  await validateTeamOwnership(event, teamId)
  const teamMembers = await findTeamMembers(teamId)
  return teamMembers
})
