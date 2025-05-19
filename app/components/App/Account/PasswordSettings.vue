<template>
  <UCard>
    <template #header>
      <h3 class="font-medium">Security</h3>
      <p class="mt-1 text-sm text-neutral-500">Your credentials are encrypted and stored securely.</p>
    </template>
    <UForm :schema="passwordSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Current Password" name="currentPassword">
        <UInput
          v-model="state.currentPassword"
          type="password"
          placeholder="Enter current password"
          class="w-full"
          size="lg"
        />
      </UFormField>
      <UFormField label="New Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Enter new password" class="w-full" size="lg" />
      </UFormField>
      <div class="flex gap-2">
        <UButton color="neutral" :loading="loading" :disabled="loading" type="submit" label="Update Password" />
        <UButton
          color="neutral"
          type="button"
          label="Send a password reset email"
          variant="subtle"
          @click="resetPassword"
        />
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const { loading, updatePassword, passwordSchema } = useUserAccount();
const state = ref({ password: '', currentPassword: '' });
const { forgotPassword } = useAuth();
const { user } = useUserSession();
const onSubmit = async () => {
  await updatePassword(state.value);
  state.value = { password: '', currentPassword: '' };
};

const resetPassword = async () => {
  if (user.value?.email) {
    loading.value = true;
    await forgotPassword(user.value.email);
    loading.value = false;
  }
};
</script>
