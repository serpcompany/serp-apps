import { isTeamMember } from '@@/server/database/queries/teams'
import { getTasksByBoardId } from '@@/server/database/queries/tasks'

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
  const boardId = getRouterParam(event, 'boardId')
  if (!boardId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Board ID is required',
    })
  }
  const tasks = await getTasksByBoardId(boardId, teamId)
  return tasks
})
