<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Reset your password</p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter your email below to reset your password.
        </p>
      </div>
      <UForm
        :schema="emailSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Send reset instructions
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { emailSchema } from '@@/shared/validations/auth'
import { toast } from 'vue-sonner'

type PasswordResetSchema = z.output<typeof emailSchema>
const loading = ref(false)

const state = reactive<Partial<PasswordResetSchema>>({
  email: undefined,
})

const onSubmit = async (
  event: FormSubmitEvent<PasswordResetSchema>,
): Promise<void> => {
  try {
    loading.value = true
    toast.success('Password reset instructions sent')
  } catch (error: any) {
    toast.error(
      error.data.message || 'Failed to send password reset instructions',
    )
  } finally {
    loading.value = false
  }
}
</script>
