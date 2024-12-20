<template>
  <div
    class="relative hidden w-0 flex-col items-stretch border-r border-zinc-200 bg-zinc-100 md:flex md:w-64 dark:border-zinc-900 dark:bg-black"
  >
    <header class="p-2">
      <AppTeamDropdown />
    </header>
    <div class="flex-1 overflow-y-auto p-2">
      <ul class="space-y-1">
        <li v-for="link in links" :key="link.to">
          <AppSidebarLink v-bind="link" />
        </li>
        <USeparator class="my-4" />
        <li v-for="link in settings" :key="link.to">
          <AppSidebarLink v-bind="link" />
        </li>
      </ul>
    </div>
    <footer class="p-2">
      <AppUserDropdown />
    </footer>
  </div>
  <USlideover side="left" v-model:open="mobileMenu">
    <template #content>
      <div class="flex h-full flex-col p-2">
        <div class="flex items-center justify-between">
          <AppTeamDropdown />
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="mobileMenu = false"
          />
        </div>
        <div class="flex-1 overflow-y-auto">
          <ul class="space-y-1">
            <li v-for="link in links" :key="link.to">
              <AppSidebarLink v-bind="link" />
            </li>
            <USeparator class="my-4" />
            <li v-for="link in settings" :key="link.to">
              <AppSidebarLink v-bind="link" />
            </li>
          </ul>
        </div>
        <footer>
          <AppUserDropdown />
        </footer>
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
const teamSlug = useRoute().params.team as string
const mobileMenu = useState('mobileMenu', () => false)
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
