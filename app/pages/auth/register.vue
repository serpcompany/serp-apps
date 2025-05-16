<template>
  <main class="relative flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <template v-if="!registered">
        <img src="/logo.png" alt="logo" class="mx-auto h-10 w-auto" />
        <div class="text-center">
          <p class="text-lg font-bold">Get Started with Supersaas</p>
          <p class="text-sm text-neutral-500">
            Already have an account?
            <UButton
              padding="none"
              trailing-icon="i-lucide-arrow-right"
              color="neutral"
              to="/auth/login"
              variant="link"
              label="Login"
              class="font-normal"
              :ui="{
                trailingIcon: 'size-4',
              }"
              square
            />
          </p>
        </div>
        <UForm
          :schema="emailPasswordRegisterSchema"
          :state="state"
          class="mt-8 space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Name" name="name">
            <UInput
              v-model="state.name"
              class="w-full"
              size="lg"
              autocomplete="given-name"
            />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              class="w-full"
              size="lg"
              autocomplete="email"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              class="w-full"
              size="lg"
              autocomplete="new-password"
            />
          </UFormField>

          <UFormField label="Confirm Password" name="confirmPassword">
            <UInput
              v-model="state.confirmPassword"
              type="password"
              class="w-full"
              size="lg"
              autocomplete="new-password"
            />
          </UFormField>

          <UButton
            type="submit"
            :loading="loading"
            block
            class="cursor-pointer"
            size="lg"
          >
            Submit
          </UButton>
        </UForm>
      </template>
      <UCard v-else>
        <UIcon name="i-lucide-mail-check" class="h-5 w-5" />
        <p class="mt-4 text-lg font-bold">Check your email</p>
        <p class="mt-1 text-sm text-neutral-500">
          We've sent you an email to verify your account.
        </p>
      </UCard>
    </div>
  </main>
</template>

<script setup lang="ts">
import { emailPasswordRegisterSchema } from '@@/shared/zod-schema';
import type { FormSubmitEvent } from '#ui/types';
import { z } from 'zod';

const registered = ref(false);
const loading = ref(false);

type Schema = z.output<typeof emailPasswordRegisterSchema>;

const state = reactive<Partial<Schema>>({
  email: '',
  password: undefined,
  name: undefined,
  confirmPassword: undefined,
});

const { register } = useAuth()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    const { emailVerified } = await register(event.data)
    if (!emailVerified) {
      registered.value = true;
    }
  } catch {
    loading.value = false;
  }
}
</script>
