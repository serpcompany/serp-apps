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
const teamSlug = useState('teamSlug')
const links = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${teamSlug.value}`,
  },
  {
    label: 'Posts',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${teamSlug.value}/posts`,
  },
])

const settings = computed(() => [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${teamSlug.value}/settings`,
  },
  {
    label: 'Workspace Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${teamSlug.value}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${teamSlug.value}/settings/billing`,
  },
])
</script>
