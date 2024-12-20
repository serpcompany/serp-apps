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
const teams = useState('teams', () => memberships.value)
const handleTeamRedirect = async () => {
  // Only run this logic for the dashboard root path
  if (useRoute().path !== '/dashboard' && useRoute().path !== '/dashboard/') {
    return
  }

  // Redirect to onboarding if no teams
  if (!teams.value?.length) {
    await navigateTo('/dashboard/onboard')
    return
  }

  const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences()
  const lastTeamSlug = getLastUsedTeam()

  // Find last used team or fallback to first team
  const targetTeam =
    teams.value.find((team) => team.slug === lastTeamSlug) ?? teams.value[0]

  if (!targetTeam) {
    throw createError({
      statusCode: 500,
      message: 'No team found despite having memberships',
    })
  }

  // Update last used team and redirect
  setLastUsedTeam(targetTeam.slug)
  await navigateTo(`/dashboard/${targetTeam.slug}`)
}

// Execute the function
handleTeamRedirect()
</script>
