<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar v-if="!isOnboardRoute" />
    <div class="w-full min-w-0 flex-1 overflow-y-auto">
      <SuperAdminImpersonationBanner v-if="user?._impersonated" :user="user" />
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
import type { Team } from '@@/types/database'
const { user } = useUserSession()

const { data: memberships } = await useFetch<Team[]>('/api/me/memberships')
useState('teams', () => memberships.value)

if (useRoute().path === '/dashboard' || useRoute().path === '/dashboard/') {
  const { handleTeamRedirect } = useTeamRedirect()
  await handleTeamRedirect()
}
const route = useRoute()

const isOnboardRoute = computed(() =>
  route.path.startsWith('/dashboard/onboard'),
)
</script>
