<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-[240px]',
      item: 'cursor-pointer',
      itemTrailingIcon: 'size-3',
    }"
  >
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
  <UDrawer
    :ui="{ container: 'max-w-xl mx-auto' }"
    v-model:open="newTeamModal"
    title="Create a new team"
    description="A team is a workspace for your organization."
  >
    <template #body>
      <AppNewTeamForm @success="onTeamCreated" />
    </template>
  </UDrawer>
</template>

<script lang="ts" setup>
import type { Team } from '@@/types/database'

const newTeamModal = ref(false)
const teams = useState<Team[]>('teams')
const teamSlug = useRoute().params.team as string
const { setLastUsedTeam } = useTeamPreferences()
const activeTeam = computed(() =>
  teams.value?.find((team) => team.slug === teamSlug),
)

const getAvatarProps = (team?: Team) => ({
  src: team?.logo as string,
  size: 'xs' as const,
})

const onTeamCreated = (team: Team) => {
  newTeamModal.value = false
  navigateTo(`/dashboard/${team.slug}`)
}

const items = computed(() => {
  if (!teams.value) return []

  const allTeams = teams.value.map((team) => ({
    label: team.name,
    avatar: {
      src: team.logo as string,
      size: '2xs' as const,
    },
    type: 'checkbox' as const,
    checked: team.slug === teamSlug,
    onSelect: (e: Event) => {
      e.preventDefault()
      setLastUsedTeam(team.slug)
      return navigateTo(`/dashboard/${team.slug}`)
    },
  }))

  return [
    [...allTeams],
    [
      {
        label: 'Create a new team',
        icon: 'i-lucide-plus-circle',
        onSelect: () => {
          newTeamModal.value = true
        },
      },
    ],
  ]
})
</script>
