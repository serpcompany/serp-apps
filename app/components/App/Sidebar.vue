<template>
  <!-- Desktop Sidebar -->
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
      <AppSidebarNavigation
        :is-account-settings="isAccountSettings"
        :team-slug="teamSlug"
      />
    </div>

    <footer class="p-2">
      <AppUserDropdown />
    </footer>
  </div>

  <!-- Mobile Sidebar -->
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
          <AppSidebarNavigation
            :is-account-settings="isAccountSettings"
            :team-slug="teamSlug"
          />
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
const router = useRouter()
const mobileMenu = useState('mobileMenu', () => false)

const teamSlug = computed(() => route.params.team as string)
const isAccountSettings = computed(() =>
  route.path.startsWith('/dashboard/account-'),
)
</script>
