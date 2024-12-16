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
          <ULink
            :to="link.to"
            exact
            class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-zinc-200/80 dark:hover:bg-white/20"
            active-class="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/20"
            inactive-class="text-[var(--ui-text-muted)]"
          >
            <UIcon :name="link.icon" class="h-4 w-4" />
            <p class="text-sm">{{ link.label }}</p>
          </ULink>
        </li>
        <USeparator class="my-4" />
        <li v-for="link in settings" :key="link.to">
          <ULink
            :to="link.to"
            exact
            class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-zinc-200/80 dark:hover:bg-white/20"
            active-class="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/20"
            inactive-class="text-[var(--ui-text-muted)]"
          >
            <UIcon :name="link.icon" class="h-4 w-4" />
            <p class="text-sm">{{ link.label }}</p>
          </ULink>
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
              <ULink
                :to="link.to"
                exact
                class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-zinc-200/80 dark:hover:bg-white/20"
                active-class="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/20"
                inactive-class="text-[var(--ui-text-muted)]"
              >
                <UIcon :name="link.icon" class="h-4 w-4" />
                <p class="text-sm">{{ link.label }}</p>
              </ULink>
            </li>
            <USeparator class="my-4" />
            <li v-for="link in settings" :key="link.to">
              <ULink
                :to="link.to"
                exact
                class="flex h-[30px] items-center gap-2 rounded-md p-2 font-medium hover:bg-zinc-200/80 dark:hover:bg-white/20"
                active-class="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/20"
                inactive-class="text-[var(--ui-text-muted)]"
              >
                <UIcon :name="link.icon" class="h-4 w-4" />
                <p class="text-sm">{{ link.label }}</p>
              </ULink>
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
const mobileMenu = useState('mobileMenu', () => false)
const links = [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/dashboard',
  },
  {
    label: 'Notes',
    icon: 'i-lucide-file-text',
    to: '/dashboard/notes',
  },
  {
    label: 'Tasks',
    icon: 'i-lucide-check-circle',
    to: '/dashboard/tasks',
  },
  {
    label: 'Image gallery',
    icon: 'i-lucide-images',
    to: '/dashboard/image-gallery',
  },
  {
    label: 'AI Chat',
    icon: 'i-lucide-message-circle',
    to: '/dashboard/ai-chat',
  },
  {
    label: 'AI Image Gen',
    icon: 'i-lucide-sparkles',
    to: '/dashboard/ai-image-gen',
  },
]

const settings = [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: '/dashboard/settings',
  },
  {
    label: 'Team Members',
    icon: 'i-lucide-users',
    to: '/dashboard/settings/members',
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: '/dashboard/settings/billing',
  },
]
</script>
