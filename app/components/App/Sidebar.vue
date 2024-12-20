<template>
  <div
    class="relative hidden w-0 flex-col items-stretch border-r border-zinc-200 bg-zinc-100 md:flex md:w-64 dark:border-zinc-900 dark:bg-black"
  >
    <header class="p-2">
      <AppTeamDropdown v-if="!isAccountSettings" />
      <UButton
        v-else
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        @click="router.back()"
      >
        Go Back
      </UButton>
    </header>
    <div class="flex-1 overflow-y-auto p-2">
      <ul class="space-y-1">
        <template v-if="isAccountSettings">
          <li v-for="link in accountLinks" :key="link.to">
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
        </template>
        <template v-else>
          <li v-for="link in teamNavLinks" :key="link.to">
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
          <li v-for="link in teamSettingsLinks" :key="link.to">
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
        </template>
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
          <AppTeamDropdown v-if="!isAccountSettings" />
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="mobileMenu = false"
          />
        </div>
        <div class="flex-1 overflow-y-auto">
          <ul class="space-y-1">
            <template v-if="isAccountSettings">
              <li v-for="link in accountLinks" :key="link.to">
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
            </template>
            <template v-else>
              <li v-for="link in teamNavLinks" :key="link.to">
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
              <li v-for="link in teamSettingsLinks" :key="link.to">
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
            </template>
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
const route = useRoute()
const teamSlug = computed(() => route.params.team as string)
const mobileMenu = useState('mobileMenu', () => false)
const router = useRouter()

// Check if we're in account settings pages
const isAccountSettings = computed(() =>
  route.path.startsWith('/dashboard/account-'),
)

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

const teamNavLinks = [
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

const teamSettingsLinks = [
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
