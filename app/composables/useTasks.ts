import type {
  Board,
  CreateBoardInput,
  CreateTaskInput,
  Task,
} from '~/types/tasks'

export const useTasks = () => {
  const { currentTeam } = useTeam()
  const toast = useToast()

  const createBoard = async (
    input: Omit<CreateBoardInput, 'teamId' | 'userId'>,
  ) => {
    try {
      const data = await $fetch<Board>(
        `/api/teams/${currentTeam.value.id}/task-board`,
        {
          method: 'POST',
          body: {
            ...input,
            teamId: currentTeam.value.id,
            userId: currentTeam.value.ownerId,
          },
        },
      )
      return data
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error creating board',
        icon: 'i-lucide-x-circle',
      })
      throw error
    }
  }

  const deleteBoard = async (boardId: string) => {
    try {
      await $fetch(`/api/teams/${currentTeam.value.id}/task-board/${boardId}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error deleting board',
        icon: 'i-lucide-x-circle',
      })
      throw error
    }
  }

  const createTask = async (
    input: Omit<CreateTaskInput, 'boardId'>,
    boardId: string,
  ) => {
    try {
      const data = await $fetch<Task>(
        `/api/teams/${currentTeam.value.id}/task-board/${boardId}/task`,
        {
          method: 'POST',
          body: {
            ...input,
            boardId,
          },
        },
      )
      return data
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error creating task',
        icon: 'i-lucide-x-circle',
      })
      throw error
    }
  }

  const getBoards = async () => {
    try {
      const data = await useFetch<Board[]>(
        `/api/teams/${currentTeam.value.id}/task-board`,
      )
      return data
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error fetching boards',
        icon: 'i-lucide-x-circle',
      })
      throw error
    }
  }

  const deleteTask = async (boardId: string, taskId: string) => {
    try {
      await $fetch(
        `/api/teams/${currentTeam.value.id}/task-board/${boardId}/task/${taskId}`,
        {
          method: 'DELETE',
        },
      )
      return true
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error deleting task',
        icon: 'i-lucide-x-circle',
      })
    }
  }

  const duplicateTask = async (boardId: string, taskId: string) => {
    try {
      await $fetch(
        `/api/teams/${currentTeam.value.id}/task-board/${boardId}/task/${taskId}/duplicate`,
        {
          method: 'POST',
        },
      )
      return true
    } catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error duplicating task',
      })
    }
  }

  return {
    createBoard,
    deleteBoard,
    createTask,
    getBoards,
    deleteTask,
    duplicateTask,
  }
}
