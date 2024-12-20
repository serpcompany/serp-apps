<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { data } = await useFetch('/api/me/memberships')
const route = useRoute()
const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences()
useState('teams', () => data.value)

if (route.path === '/dashboard' || route.path === '/dashboard/') {
  if (!data.value?.length) {
    await navigateTo('/dashboard/onboard')
  } else {
    const lastTeamSlug = getLastUsedTeam()
    const defaultTeam =
      data.value.find((team) => team.slug === lastTeamSlug) ?? data.value[0]
    if (!defaultTeam) {
      throw new Error('No team found')
    }
    setLastUsedTeam(defaultTeam.slug)
    await navigateTo(`/dashboard/${defaultTeam.slug}`)
  }
}
</script>
