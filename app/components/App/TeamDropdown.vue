<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-[240px]' }">
    <UButton
      :label="activeTeam?.name"
      :avatar="getAvatarProps(activeTeam)"
      color="neutral"
      variant="ghost"
      class="w-full hover:bg-zinc-200/80 dark:hover:bg-white/10"
      block
      trailing-icon="i-lucide-chevrons-up-down"
    />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
import type { Team } from '@@/types/database.js'

const { teams, activeTeam, getAvatarUrl, setSelectedTeam } = useTeams()

const getAvatarProps = (team?: Team) => ({
  src: getAvatarUrl(team),
  size: 'xs' as const,
})

const items = computed(() => {
  if (!teams.value) return []

  const allTeams = teams.value.map((team) => ({
    label: team.name,
    avatar: {
      src: getAvatarUrl(team),
      size: '2xs' as const,
    },
    onSelect: () => setSelectedTeam(team.id),
  }))

  return [
    [...allTeams],
    [
      {
        label: 'Create a new team',
        icon: 'i-lucide-plus-circle',
        onSelect: () => navigateTo('/dashboard/new-team'),
      },
    ],
  ]
})
</script>
