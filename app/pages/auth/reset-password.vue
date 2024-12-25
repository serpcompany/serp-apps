<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Reset your password</p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter your new password below.
        </p>
      </div>
      <UForm
        :schema="resetPasswordSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="New Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Reset Password
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()
const route = useRoute()
const loading = ref(false)

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type Schema = z.output<typeof resetPasswordSchema>

const state = reactive<Partial<Schema>>({
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/password/reset', {
      method: 'POST',
      body: {
        token: route.query.token,
        password: event.data.password,
      },
    })
    toast.add({
      title: 'Password reset successfully',
      color: 'success',
    })
    navigateTo('/auth/login')
  } catch (error: any) {
    toast.add({
      title: 'Failed to reset password',
      description: error.data?.message || 'Failed to reset password',
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>
