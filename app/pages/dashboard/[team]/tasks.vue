<template>
  <AppContainer title="Tasks">
    <div
      class="flex h-[calc(100dvh-80px)] snap-x snap-mandatory gap-8 overflow-x-auto"
    >
      <AppTasksBoard v-for="board in boards" :key="board.id" :board="board" />
      <AppTasksNewBoard @create="createBoard" />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
const { currentTeam } = useTeam()
const { data: boards } = await useFetch(
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
    const { data } = await $fetch(
      `/api/teams/${currentTeam.value.id}/task-board`,
      {
        method: 'POST',
        body: { name },
      },
    )
    boards.value.push(data)
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
</script>
