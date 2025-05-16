<template>
  <main class="flex min-h-screen items-center justify-center">
    <UContainer class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-auto" />
      <div class="text-center">
        <p class="text-lg font-bold">Sign in to Supersaas</p>
        <p class="text-sm text-neutral-500">
          Dont have an account?
          <UButton
            padding="none"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            to="/auth/register"
            variant="link"
            label="Get Started"
            class="font-normal"
            :ui="{
              trailingIcon: 'size-4'
            }"
            tabindex="1"
            square
          />
        </p>
      </div>
      <UForm :schema="emailPasswordLoginSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg" tabindex="2" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" class="w-full" size="lg" tabindex="3" />
          <template #hint>
            <UButton
              variant="link"
              to="/auth/forgot-password"
              label="Forgot password?"
              size="xs"
              color="neutral"
              class="text-neutral-500"
              tabindex="5"
            />
          </template>
        </UFormField>
        <UButton type="submit" block size="lg" tabindex="4" :loading="loading"> Submit </UButton>
      </UForm>
      <USeparator label="OR" />
      <div class="grid grid-cols-2 gap-2">
        <AuthSocialLoginButton label="Google" icon="i-custom-google" provider="google" />
        <AuthSocialLoginButton label="Github" icon="i-custom-github" provider="github" />
      </div>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { emailPasswordLoginSchema } from '@@/shared/zod-schema';

type Schema = z.output<typeof emailPasswordLoginSchema>;
const loading = ref(false);
const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
});

const { login } = useAuth();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  await login(event.data);
  loading.value = false;
}
</script>
