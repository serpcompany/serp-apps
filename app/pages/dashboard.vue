<template>
  <div>
    <NuxtPage />
  </div>
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

  // check if there is an invite token pending in cookies
  const inviteToken = useCookie('invite-token')
  if (inviteToken.value) {
    const url = `/api/teams/verify-invite?token=${inviteToken.value}`
    // remove the cookie
    inviteToken.value = null
    return await navigateTo(url)
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
