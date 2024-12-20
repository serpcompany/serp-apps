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
import type { Team } from '@@/types/database'

const teams = useState<Team[]>('teams')
const teamSlug = useRoute().params.team as string

const activeTeam = computed(() =>
  teams.value?.find((team) => team.slug === teamSlug),
)

const getAvatarProps = (team?: Team) => ({
  src: team?.logo as string,
  size: 'xs' as const,
})

const items = computed(() => {
  if (!teams.value) return []

  const allTeams = teams.value.map((team) => ({
    label: team.name,
    avatar: {
      src: team.logo as string,
      size: '2xs' as const,
    },
    onSelect: () => navigateTo(`/dashboard/${team.slug}`),
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
