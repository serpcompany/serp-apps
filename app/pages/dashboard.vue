<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar />
    <div class="w-full min-w-0 flex-1 overflow-y-auto">
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
import type { Team } from '@@/types/database'
const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
useState('teams', () => memberships.value)

// Only run redirect logic for the dashboard root path
if (useRoute().path === '/dashboard' || useRoute().path === '/dashboard/') {
  const { handleTeamRedirect } = useTeamRedirect()
  await handleTeamRedirect()
}
</script>
