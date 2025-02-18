<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4 text-center">
      <UIcon
        name="i-lucide-alert-circle"
        class="mx-auto h-12 w-12 text-red-500"
      />
      <div>
        <h1 class="text-2xl font-bold">{{ props.error.statusCode === 404 ? 'Page Not Found' : 'Error' }}</h1>
        <p class="mt-2 text-sm text-neutral-500">
          {{ message }}
        </p>
        <p class="mt-2 text-xs text-neutral-400">
          <span class="font-semibold">URL:</span> <span class="font-mono">{{ path }}</span>
        </p>
      </div>
      <UButton
        to="/"
        variant="ghost"
        color="neutral"
        class="mx-auto"
      >
        Return Home
      </UButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  error: {
    statusCode: number
    message?: string
    statusMessage?: string
  }
}>()

const route = useRoute()
const path = route.path
const hasToken = route.query.token != null

const message = computed(() => {
  // Handle email verification link
  if (path === '/api/auth/verify-account' && hasToken) {
    return `This verification link may have already been used. If you still need to verify your email, please request a new verification link.`
  }

  // Handle team invite link
  if (path === '/api/teams/invites/verify' && hasToken) {
    return `This invite link may have already been used or expired. Please request a new invite from your team administrator.`
  }

  // Default messages
  return props.error.statusCode === 404
    ? 'The page you are looking for might have been removed or is temporarily unavailable.'
    : 'Something went wrong. Please try again later.'
})
</script> 