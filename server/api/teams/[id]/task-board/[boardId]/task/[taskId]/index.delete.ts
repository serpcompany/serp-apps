import { isTeamMember } from '@@/server/database/queries/teams'
import { deleteTask } from '@@/server/database/queries/tasks'

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

  const taskId = getRouterParam(event, 'taskId')
  if (!taskId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Task ID is required',
    })
  }
  await deleteTask(taskId, user.id, teamId)
  return sendNoContent(event)
})
