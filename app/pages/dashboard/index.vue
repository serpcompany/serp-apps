<template>
  <div>
    <div
      v-if="status === 'pending'"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80"
    >
      <UIcon name="i-lucide-loader" class="animate-spin" />
    </div>

    <!-- Main content -->
    <UContainer v-else class="space-y-4 py-12">
      <p class="text-3xl font-bold">Welcome {{ user?.name }}</p>
      <div class="space-y-1 rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
        <UAvatar :src="user?.avatarUrl ?? undefined" icon="i-lucide-user" />
        <p>Name: {{ user?.name }}</p>
        <p>Email: {{ user?.email }}</p>
        <p>ID: {{ user?.id }}</p>
        <p>Phone: {{ user?.phoneNumber }}</p>
        <p>Teams: {{ teams }}</p>
      </div>
      <UButton @click="signOut"> Log out </UButton>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const nuxtApp = useNuxtApp()
const { status, data: teams } = await useFetch('/api/teams/user-teams', {
  key: 'user-teams',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

// Redirect if no teams are available
watchEffect(() => {
  if (
    status.value === 'success' &&
    (!teams.value || teams.value.length === 0)
  ) {
    return navigateTo('/dashboard/teams/new')
  }
})

async function signOut() {
  await clear()
  await navigateTo('/')
}
</script>
