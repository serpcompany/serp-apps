<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-[240px]' }">
    <UButton
      :label="activeTeam?.name"
      :avatar="getAvatarProps(activeTeam)"
      color="neutral"
      variant="ghost"
      class="w-full hover:bg-zinc-200/80 dark:hover:bg-white/10"
      block
      trailing-icon="i-lucide-chevron-down"
    />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
import type { Team } from '@@/types/database.js'
import type { DropdownMenuItem } from '#ui/types'

const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: '/',
} as const


const teams = useState<Team[]>('teams')
const selectedTeamCookie = useCookie<string>('selectedTeam', COOKIE_OPTIONS)

const getAvatarUrl = (team?: Team): string => {
  if (!team?.name) return ''
  return team.logo
    ? `/images/${team.logo}`
    : `https://api.dicebear.com/9.x/glass/svg?seed=${team.name}`
}

const getAvatarProps = (team?: Team) => ({
  src: getAvatarUrl(team),
  size: 'xs' as const,
})

const activeTeam = computed(() => {
  const selectedId = selectedTeamCookie.value
  return selectedId
    ? teams.value?.find((team) => team.id === selectedId) || teams.value?.[0]
    : teams.value?.[0]
})

const items = computed<DropdownMenuItem[]>(() => {
  if (!teams.value) return []

  return teams.value.map((team) => ({
    label: team.name,
    avatar: {
      src: getAvatarUrl(team),
      size: '2xs' as const,
    },
    onSelect() {
      selectedTeamCookie.value = team.id
      window.location.reload()
    },
  }))
})
</script>
