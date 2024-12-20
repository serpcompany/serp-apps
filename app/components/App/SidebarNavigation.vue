<template>
  <ul class="space-y-1">
    <template v-if="isAccountSettings">
      <li v-for="link in accountLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
    </template>
    <template v-else>
      <li v-for="link in teamNavLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
      <USeparator class="my-4" />
      <li v-for="link in teamSettingsLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isAccountSettings: boolean
  teamSlug?: string
}>()

const accountLinks = [
  {
    label: 'General Settings',
    icon: 'i-lucide-settings',
    to: '/dashboard/account-settings',
  },
  {
    label: 'Security',
    icon: 'i-lucide-shield',
    to: '/dashboard/account-security',
  },
]

const teamNavLinks = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${props.teamSlug}`,
  },
  {
    label: 'Notes',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${props.teamSlug}/notes`,
  },
  {
    label: 'Tasks',
    icon: 'i-lucide-check-circle',
    to: `/dashboard/${props.teamSlug}/tasks`,
  },
  {
    label: 'Link Shortner',
    icon: 'i-lucide-link',
    to: `/dashboard/${props.teamSlug}/link-shortner`,
  },
  {
    label: 'Image gallery',
    icon: 'i-lucide-images',
    to: `/dashboard/${props.teamSlug}/image-gallery`,
  },
  {
    label: 'AI Chat',
    icon: 'i-lucide-message-circle',
    to: `/dashboard/${props.teamSlug}/ai-chat`,
  },
  {
    label: 'AI Image Gen',
    icon: 'i-lucide-sparkles',
    to: `/dashboard/${props.teamSlug}/ai-image-gen`,
  },
])

const teamSettingsLinks = computed(() => [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${props.teamSlug}/settings`,
  },
  {
    label: 'Team Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${props.teamSlug}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${props.teamSlug}/settings/billing`,
  },
])
</script>
