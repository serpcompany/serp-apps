<template>
  <UCard>
    <template #header> Profile </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { Team } from '@@/types/database.js'

const teams = useState<Team[]>('teams')
const selectedTeamCookie = useCookie<string>('selectedTeam')

const activeTeam = computed(() => {
  const selectedId = selectedTeamCookie.value
  return selectedId
    ? teams.value?.find((team) => team.id === selectedId) || teams.value?.[0]
    : teams.value?.[0]
})
</script>
