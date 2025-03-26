import { isTeamMember } from '@@/server/database/queries/teams'
import { createBoard } from '@@/server/database/queries/tasks'

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

  const { name } = await readBody(event)
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Board name is required',
    })
  }
  const board = await createBoard(name, user.id, teamId)
  return board
})
