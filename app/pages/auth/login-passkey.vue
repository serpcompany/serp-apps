<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto max-w-2xl space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to your account</p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <UForm
        :schema="magicLinkLoginSchema"
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
          icon="i-lucide-fingerprint"
        >
          Sign in with Passkey
        </UButton>
      </UForm>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { magicLinkLoginSchema } from '@@/shared/validations/auth'
import { toast } from 'vue-sonner'
const { fetch: refreshSession } = useUserSession()
type LoginSchema = z.output<typeof magicLinkLoginSchema>
const loading = ref(false)

const state = reactive<Partial<LoginSchema>>({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  console.log(event.data)
}
</script>
