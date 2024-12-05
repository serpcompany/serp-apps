<template>
  <div>
    <UContainer class="space-y-4 py-12">
      <p class="text-3xl font-bold">Welcome {{ user?.name }}</p>
      <div class="space-y-1 rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
        <UAvatar :src="user?.avatarUrl ?? undefined" icon="i-lucide-user" />
        <p>Name: {{ user?.name }}</p>
        <p>Email: {{ user?.email }}</p>
        <p>ID: {{ user?.id }}</p>
        <p>Phone: {{ user?.phoneNumber }}</p>
        <p>Teams: {{ userTeams }}</p>
      </div>
      <UButton @click="signOut"> Log out </UButton>
      <div
        v-if="userTeams?.length === 0"
        class="bg-gray-100 p-4 dark:bg-zinc-800"
      >
        <h1>Create a new team to get started</h1>
        <UButton to="/dashboard/teams/new" color="neutral" variant="subtle">
          Create team
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const nuxtApp = useNuxtApp()
const { data: userTeams } = await useFetch('/api/teams/user-teams', {
  key: 'user-teams',
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

async function signOut() {
  await clear()
  await navigateTo('/')
}
</script>
