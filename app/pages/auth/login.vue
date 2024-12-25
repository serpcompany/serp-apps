<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to your account</p>
        <p class="text-sm text-gray-500">
          Welcome back! Please sign in to continue.
        </p>
      </div>
      <UForm
        :schema="loginUserSchema"
        :state="state"
        class="mt-8 space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            size="lg"
          />
          <template #hint>
            <UButton
              variant="link"
              to="/auth/forgot-password"
              label="Forgot password?"
              size="xs"
              color="neutral"
              class="text-neutral-500"
            />
          </template>
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          block
          color="neutral"
          class="cursor-pointer"
          size="lg"
        >
          Submit
        </UButton>
      </UForm>
      <USeparator label="or continue with" />
      <div class="space-y-2">
        <UButton
          to="/auth/magic-link"
          block
          color="neutral"
          size="lg"
          icon="i-lucide-link"
          variant="soft"
        >
          Email Link
        </UButton>
        <UButton
          to="/auth/login-passkey"
          block
          color="neutral"
          size="lg"
          icon="i-lucide-fingerprint"
          variant="soft"
        >
          Passkey
        </UButton>
        <UButton
          to="/auth/login-phone"
          block
          color="neutral"
          size="lg"
          icon="i-lucide-phone"
          variant="soft"
        >
          Phone
        </UButton>
        <AuthSocialLoginButton
          label="Google"
          icon="i-mdi-google"
          provider="google"
        />
        <AuthSocialLoginButton
          label="Github"
          icon="i-mdi-github"
          provider="github"
        />
        <AuthSocialLoginButton
          label="Discord"
          icon="i-simple-icons-discord"
          provider="discord"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'

import type { FormSubmitEvent } from '#ui/types'
import { loginUserSchema } from '@@/shared/validations/auth'
import { toast } from 'vue-sonner'
type Schema = z.output<typeof loginUserSchema>

const { fetch: refreshSession } = useUserSession()
const loading = ref(false)

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/password/login', {
      method: 'POST',
      body: event.data,
    })
    await refreshSession()
    toast('Logged in')
    navigateTo('/dashboard')
  } catch (error) {
    toast.error('Something went wrong', {
      description: (error as any).data.message,
    })
  } finally {
    loading.value = false
  }
}
</script>
