<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-auto" />
      <div class="text-center">
        <p class="text-lg font-bold">Email Verification Error</p>
        <p class="text-sm text-neutral-500 mt-2">
          {{ errorMessage }}
        </p>
      </div>
      
      <div v-if="hasEmail" class="mt-8">
        <UButton
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
          :loading="loading"
          @click="resendVerification"
        >
          Resend Verification Email
        </UButton>
      </div>
      
      <div class="mt-4 text-center">
        <UButton
          padding="none"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          to="/auth/login"
          variant="link"
          label="Back to Login"
          class="font-normal"
          :ui="{
            trailingIcon: 'size-4',
          }"
          square
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const errorMessage = ref(route.query.message || 'An error occurred during email verification.')
const hasEmail = computed(() => !!route.query.email)
const email = ref(route.query.email as string || '')
const loading = ref(false)
const toast = useToast()

async function resendVerification() {
  if (!email.value) return
  
  loading.value = true
  try {
    await $fetch('/api/auth/resend-verification', {
      method: 'POST',
      body: { email: email.value },
    })
    toast.add({
      title: 'Verification email sent',
      description: 'Please check your inbox',
      color: 'success',
      duration: 5000,
    })
  } catch (error: FetchError) {
    toast.add({
      title: 'Error',
      description: error.statusMessage || 'Failed to resend verification email',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>