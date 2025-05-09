import { isTeamMember } from '@@/server/database/queries/teams'
import { createTask } from '@@/server/database/queries/tasks'
import type { InsertTask } from '~~/types/database'

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

  const { title, description, priority, assignedTo, dueDate }
    = await readBody(event)

  const formattedDueDate = new Date(dueDate)

  const payload: InsertTask = {
    title,
    description,
    priority,
    assignedToId: assignedTo,
    dueDate: formattedDueDate,
    teamId,
    createdById: user.id,
    boardId,
    completed: false,
  }
  const task = await createTask(payload)
  return task
})
