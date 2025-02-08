<template>
  <header>
    <AppTeamDropdown />
  </header>
  <AppSidebarContent class="mt-2">
    <AppSidebarGroup>
      <AppSidebarLink v-for="link in links" :key="link.to" v-bind="link" />
      <template v-if="isTeamOwner">
        <USeparator class="my-4" />
        <AppSidebarLink v-for="link in settings" :key="link.to" v-bind="link" />
      </template>
    </AppSidebarGroup>
  </AppSidebarContent>
</template>

<script lang="ts" setup>
const { isTeamOwner } = useTeam()
const teamSlug = useRoute().params.team as string
const links = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${teamSlug}`,
  },
  {
    label: 'Notes',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${teamSlug}/notes`,
  },
  {
    label: 'Tasks',
    icon: 'i-lucide-check-circle',
    to: `/dashboard/${teamSlug}/tasks`,
  },
  {
    label: 'Link Shortner',
    icon: 'i-lucide-link',
    to: `/dashboard/${teamSlug}/link-shortner`,
  },
  {
    label: 'Image gallery',
    icon: 'i-lucide-images',
    to: `/dashboard/${teamSlug}/image-gallery`,
  },
  {
    label: 'AI Chat',
    icon: 'i-lucide-message-circle',
    to: `/dashboard/${teamSlug}/ai-chat`,
  },
  {
    label: 'AI Image Gen',
    icon: 'i-lucide-sparkles',
    to: `/dashboard/${teamSlug}/ai-image-gen`,
  },
]

const settings = [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${teamSlug}/settings`,
  },
  {
    label: 'Team Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${teamSlug}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${teamSlug}/settings/billing`,
  },
]
</script>
