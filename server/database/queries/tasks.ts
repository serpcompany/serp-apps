import { eq, and, desc } from 'drizzle-orm'
import { InsertTask, Task, InsertBoard, Board } from '~~/types/database'

export const createBoard = async (
  boardName: string,
  userId: string,
  teamId: string,
) => {
  const newBoard = await useDB()
    .insert(tables.boards)
    .values({ name: boardName, userId, teamId })
    .returning()
    .get()
  return newBoard
}

export const getBoardById = async (
  id: string,
  userId: string,
  teamId: string,
) => {
  const board = await useDB().query.boards.findFirst({
    where: and(
      eq(tables.boards.id, id),
      eq(tables.boards.userId, userId),
      eq(tables.boards.teamId, teamId),
    ),
  })
  return board
}

export const getBoardsByTeamId = async (teamId: string) => {
  const boards = await useDB().query.boards.findMany({
    where: eq(tables.boards.teamId, teamId),
    with: {
      tasks: true,
    },
  })
  return boards
}

export const updateBoard = async (
  id: string,
  board: Partial<Board>,
  userId: string,
  teamId: string,
) => {
  const updatedBoard = await useDB()
    .update(tables.boards)
    .set(board)
    .where(
      and(
        eq(tables.boards.id, id),
        eq(tables.boards.userId, userId),
        eq(tables.boards.teamId, teamId),
      ),
    )
    .returning()
    .get()
  return updatedBoard
}

export const createTask = async (
  task: InsertTask,
  userId: string,
  teamId: string,
) => {
  const newTask = await useDB()
    .insert(tables.tasks)
    .values({
      ...task,
      createdById: userId,
      teamId,
    })
    .returning()
    .get()
  return newTask
}

export const getTasksByUserId = async (userId: string, teamId: string) => {
  const tasks = await useDB().query.tasks.findMany({
    where: and(
      eq(tables.tasks.assignedToId, userId),
      eq(tables.tasks.teamId, teamId),
    ),
    orderBy: [desc(tables.tasks.createdAt)],
  })
  return tasks
}

export const getTasksByTeamId = async (teamId: string) => {
  const tasks = await useDB().query.tasks.findMany({
    where: eq(tables.tasks.teamId, teamId),
    orderBy: [desc(tables.tasks.createdAt)],
  })
  return tasks
}

export const getTaskById = async (id: string) => {
  const task = await useDB().query.tasks.findFirst({
    where: eq(tables.tasks.id, id),
  })
  return task
}

export const updateTask = async (
  id: string,
  task: Partial<Task>,
  userId: string,
  teamId: string,
) => {
  const updatedTask = await useDB()
    .update(tables.tasks)
    .set(task)
    .where(
      and(
        eq(tables.tasks.id, id),
        eq(tables.tasks.createdById, userId),
        eq(tables.tasks.teamId, teamId),
      ),
    )
    .returning()
    .get()
  return updatedTask
}

export const deleteTask = async (
  id: string,
  userId: string,
  teamId: string,
) => {
  await useDB()
    .delete(tables.tasks)
    .where(
      and(
        eq(tables.tasks.id, id),
        eq(tables.tasks.createdById, userId),
        eq(tables.tasks.teamId, teamId),
      ),
    )
}
