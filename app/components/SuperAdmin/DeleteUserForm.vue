<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UAvatar :src="user.avatarUrl || undefined" :alt="user.name" size="lg" />
      <div>
        <p class="text-sm font-bold">{{ user.name }}</p>
        <p class="text-sm text-neutral-500">{{ user.email }}</p>
      </div>
    </div>
    <div class="space-y-4 rounded-md bg-neutral-100 p-4 dark:bg-neutral-950">
      <p class="text-sm text-neutral-500">
        This action will delete the user from the platform and all associated data
      </p>
    </div>

    <div class="flex w-full justify-end gap-2">
      <UButton variant="soft" color="neutral" label="Cancel" @click="$emit('cancel')" />
      <UButton
        variant="soft"
        color="error"
        label="Delete User"
        :loading="loading"
        @click="deleteUser"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OAuthAccount, User } from '@@/types/database';

interface ExtendedUser extends User {
  oauthAccounts?: OAuthAccount[];
}

const props = defineProps<{
  user: ExtendedUser;
  users?: User[];
}>();

const emit = defineEmits(['user-deleted', 'cancel']);
const loading = ref(false);
const toast = useToast();

const deleteUser = async () => {
  loading.value = true;
  try {
    await $fetch<User[]>('/api/super-admin/users', {
      method: 'DELETE',
      body: { userId: props.user.id }
    });
    toast.add({
      title: 'User deleted successfully',
      description: 'The user has been deleted',
      color: 'success'
    });
    emit('user-deleted');
  } catch (error) {
    console.error(error);
    toast.add({
      title: 'Error',
      description: 'Failed to delete user',
      color: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>
