<template>
  <AppContainer title="Tasks">
    <div
      class="flex h-[calc(100dvh-80px)] snap-x snap-mandatory gap-8 overflow-x-auto"
      v-auto-animate
    >
      <AppTasksBoard
        v-for="board in boards"
        :key="board.id"
        :board="board"
        :is-deleting="isDeleting"
        @delete="deleteBoard(board.id)"
        @add-task="appendTask(board.id, task)"
      />
      <AppTasksNewBoard @create="createBoard" />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
type SerializedTask = {
  id: string
  createdById: string
  createdAt: string | null
  updatedAt: string | null
  teamId: string
  assignedToId: string
  boardId: string
  title: string
  description: string | null
  status: string
  dueDate: string | null
}

type SerializedBoard = {
  id: string
  name: string
  createdAt: string | null
  updatedAt: string | null
  teamId: string
  userId: string
  tasks: SerializedTask[]
}

const { currentTeam } = useTeam()
const { data: boards } = await useFetch<SerializedBoard[]>(
  `/api/teams/${currentTeam.value.id}/task-board`,
)
const nuxtApp = useNuxtApp()
await useFetch(`/api/teams/${currentTeam.value.id}`, {
  lazy: true,
  server: false,
  key: 'team-members',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

const toast = useToast()
const createBoard = async (name: string) => {
  try {
    const data = await $fetch<SerializedBoard>(
      `/api/teams/${currentTeam.value.id}/task-board`,
      {
        method: 'POST',
        body: { name },
      },
    )
    // Add empty tasks array if it's not included
    const newBoard = { ...data, tasks: data.tasks || [] }

    // Use array spread to create a new array reference, triggering reactivity
    boards.value = [...(boards.value || []), newBoard]

    toast.add({
      title: 'Board created',
      description: 'Board created successfully',
      icon: 'i-lucide-check-circle',
    })
  } catch (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: 'Error creating board',
      icon: 'i-lucide-x-circle',
    })
  }
}

const isDeleting = ref(false)
const deleteBoard = async (boardId: string) => {
  try {
    isDeleting.value = true
    await $fetch(`/api/teams/${currentTeam.value.id}/task-board/${boardId}`, {
      method: 'DELETE',
    })
    boards.value = boards.value?.filter((board) => board.id !== boardId)
  } catch (error) {
    console.error(error)
  } finally {
    isDeleting.value = false
  }
}

const appendTask = (boardId: string, task: Task) => {
  const board = boards.value?.find((board) => board.id === boardId)
  if (board) {
    board.tasks = [...board.tasks, task]
  }
}
</script>
