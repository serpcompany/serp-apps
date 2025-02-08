<template>
  <main class="flex h-screen items-center justify-center">
    <UIcon name="i-lucide-loader-circle" class="animate-spin text-3xl" />
  </main>
</template>


<script setup lang="ts">
import type { Team } from '@@/types/database'

// Ensure we have teams data available
const teams = useState<Team[]>('teams')
if (!teams.value) {
  const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
  teams.value = memberships.value || []
}

// Handle redirect
const { handleTeamRedirect } = useTeamRedirect()
await handleTeamRedirect()
</script>
