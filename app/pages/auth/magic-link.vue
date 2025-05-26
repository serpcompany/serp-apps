<template>
  <main class="flex min-h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-sm space-y-4">
      <img src="/logo.png" alt="logo" class="mx-auto h-10 w-auto" />
      <template v-if="mode === 'login'">
        <div class="text-center">
          <p class="text-lg font-bold">Sign in to your account</p>
          <p class="text-sm text-neutral-500">Welcome back! Please sign in to continue.</p>
        </div>
        <UForm :schema="emailSchema" :state="loginState" class="mt-8 space-y-4" @submit="onLoginSubmit">
          <UFormField label="Email" name="email">
            <UInput v-model="loginState.email" class="w-full" size="lg" />
          </UFormField>

          <UButton type="submit" :loading="loading" block color="neutral" class="cursor-pointer" size="lg">
            Submit
          </UButton>
        </UForm>
      </template>
      <div v-else>
        <div class="text-center">
          <p class="text-lg font-bold">We've sent you a 6-digit code</p>
          <p class="text-sm text-neutral-500">Please check your email for the code and enter it below.</p>
        </div>
        <div class="mt-8 flex items-center justify-center">
          <UForm :schema="otpSchema" :state="otpState" class="space-y-4" @submit="onOtpSubmit">
            <UFormField name="code">
              <UPinInput
                v-model="otpCode"
                :length="6"
                size="lg"
                otp
                type="number"
                placeholder="○"
                class="justify-center"
              />
            </UFormField>
            <UButton type="submit" :loading="loading" color="neutral" class="cursor-pointer" size="lg" block>
              Verify Code
            </UButton>
          </UForm>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { emailSchema, otpSchema } from '@@/shared/zod-schema';

type LoginSchema = z.output<typeof emailSchema>;
type OtpSchema = z.output<typeof otpSchema>;

const toast = useToast();
const { magicLinkLogin, verifyMagicLinkOtp } = useAuth();

const mode = ref<'login' | 'otp'>('login');
const loading = ref(false);

const loginState = reactive<Partial<LoginSchema>>({
  email: undefined
});

const otpState = reactive<Partial<OtpSchema>>({
  email: undefined,
  code: undefined
});

const otpCode = computed({
  get: () => otpState.code?.split('') || [],
  set: (value: string[]) => {
    otpState.code = value.join('');
  }
});

async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
  try {
    loading.value = true;
    await magicLinkLogin(event.data.email);
    mode.value = 'otp';
    otpState.email = event.data.email;
  } catch (error) {
    // Error is already handled in the composable
  } finally {
    loading.value = false;
  }
}

async function onOtpSubmit(event: FormSubmitEvent<OtpSchema>) {
  try {
    loading.value = true;
    await verifyMagicLinkOtp(event.data);
  } catch (error) {
    // Error is already handled in the composable
  } finally {
    loading.value = false;
  }
}
</script>
