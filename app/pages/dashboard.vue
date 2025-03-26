<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar v-if="!isOnboardRoute" />
    <div class="w-full min-w-0 flex-1 overflow-y-auto">
      <SuperAdminImpersonationBanner v-if="user?._impersonated" :user="user" />
      <NuxtPage />
      <UModal
        v-model:open="feedbackModal"
        title="Need help?"
        description="Have a question or need assistance? We're here to help!"
      >
        <template #body>
          <AppFeedbackForm @close="feedbackModal = false" />
        </template>
      </UModal>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
const feedbackModal = useState('feedbackModal', () => false)
const { user } = useUserSession()
const route = useRoute()
const isOnboardRoute = computed(() =>
  route.path.startsWith('/dashboard/onboard'),
)
</script>
