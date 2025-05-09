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
        @delete="handleDeleteBoard(board.id)"
      />
      <AppTasksNewBoard @create="handleCreateBoard" />
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { currentTeam } = useTeam()
await useFetch(`/api/teams/${currentTeam.value.id}`, {
  lazy: true,
  server: false,
  key: 'team-members',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})
const { createBoard, deleteBoard, getBoards } = useTasks()
const { data: boards } = await getBoards()

const isDeleting = ref(false)

const handleCreateBoard = async (name: string) => {
  try {
    const newBoard = await createBoard({ name })
    // Add empty tasks array if it's not included
    const boardWithTasks = { ...newBoard, tasks: newBoard.tasks || [] }
    // Use array spread to create a new array reference, triggering reactivity
    boards.value = [...(boards.value || []), boardWithTasks]
  } catch (error) {
    console.error(error)
  }
}

const handleDeleteBoard = async (boardId: string) => {
  try {
    isDeleting.value = true
    await deleteBoard(boardId)
    boards.value = boards.value?.filter((board) => board.id !== boardId)
  } catch (error) {
    console.error(error)
  } finally {
    isDeleting.value = false
  }
}
</script>
