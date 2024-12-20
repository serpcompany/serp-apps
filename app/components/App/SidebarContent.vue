<template>
  <header v-if="isTeamContext" class="p-2">
    <AppTeamDropdown />
  </header>

  <div class="flex-1 overflow-y-auto p-2">
    <template v-if="isTeamContext">
      <AppNavLinks :links="teamLinks" @navigate="$emit('navigate')" />
      <USeparator class="my-4" />
      <AppNavLinks :links="settingsLinks" @navigate="$emit('navigate')" />
    </template>
    <AppNavLinks v-else :links="defaultLinks" @navigate="$emit('navigate')" />
  </div>

  <footer class="p-2">
    <AppUserDropdown />
  </footer>
</template>

<script lang="ts" setup>
defineProps<{
  isTeamContext: boolean
}>()

defineEmits<{
  navigate: []
}>()

const route = useRoute()
const teamSlug = computed(() => route.params.team as string)

const teamLinks = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${teamSlug.value}`,
  },
  {
    label: 'Notes',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${teamSlug.value}/notes`,
  },
  {
    label: 'Tasks',
    icon: 'i-lucide-check-circle',
    to: `/dashboard/${teamSlug.value}/tasks`,
  },
  {
    label: 'Image gallery',
    icon: 'i-lucide-images',
    to: `/dashboard/${teamSlug.value}/image-gallery`,
  },
  {
    label: 'AI Chat',
    icon: 'i-lucide-message-circle',
    to: `/dashboard/${teamSlug.value}/ai-chat`,
  },
  {
    label: 'AI Image Gen',
    icon: 'i-lucide-sparkles',
    to: `/dashboard/${teamSlug.value}/ai-image-gen`,
  },
])

const settingsLinks = computed(() => [
  {
    label: 'Team Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${teamSlug.value}/settings`,
  },
  {
    label: 'Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${teamSlug.value}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${teamSlug.value}/settings/billing`,
  },
])

const defaultLinks = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/dashboard/',
  },
  {
    label: 'Create new team',
    icon: 'i-lucide-plus-circle',
    to: '/dashboard/new-team',
  },
]
</script>
