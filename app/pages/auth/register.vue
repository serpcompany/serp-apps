<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto max-w-2xl space-y-4">
      <template v-if="!registered">
        <img src="/logo.png" alt="logo" class="mx-auto h-10 w-10" />
        <div class="text-center">
          <p class="text-lg font-bold">Create a new account</p>
          <p class="text-sm text-gray-500">
            Welcome! Please fill in your details to get started.
          </p>
        </div>
        <UForm
          :schema="registerUserSchema"
          :state="state"
          class="mt-8 space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" size="lg" />
          </UFormField>
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
      </template>
      <div
        v-else
        class="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-neutral-100 p-4 dark:border-white/10"
      >
        <UIcon name="i-lucide-mail-check" class="h-5 w-5" />
        <p class="text-lg font-bold mt-4">Check your email</p>
        <p class="text-sm text-gray-500 mt-1">
          We've sent you an email to verify your account.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { registerUserSchema } from '@@/shared/validations/auth'
import { toast } from 'vue-sonner'

type Schema = z.output<typeof registerUserSchema>
const registered = ref(false)
const loading = ref(false)

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  name: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true
    await $fetch('/api/auth/password/register', {
      method: 'POST',
      body: event.data,
    })
    registered.value = true
  } catch (error) {
    toast.error((error as any).data.message)
  } finally {
    loading.value = false
  }
}
</script>
