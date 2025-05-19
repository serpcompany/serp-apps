import { z } from 'zod';
import type { User } from '@@/types/database';

export const useUserAccount = () => {
  const toast = useToast();
  const loading = ref(false);
  const schema = z.object({
    avatarUrl: z.string().optional(),
    name: z.string().min(1)
  });

  const passwordSchema = z.object({
    currentPassword: z.string().min(1),
    password: z.string().min(8)
  });

  const updateUser = async (userData: Partial<z.infer<typeof schema>>) => {
    loading.value = true;
    try {
      await $fetch<User>('/api/me', {
        method: 'PATCH',
        body: userData
      });
      toast.add({
        title: 'Your account has been updated successfully',
        color: 'success'
      });
    } catch (error) {
      console.error(error);
      toast.add({
        title: 'Failed to update your account',
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };

  const updatePassword = async ({ currentPassword, password }: { currentPassword: string; password: string }) => {
    loading.value = true;
    try {
      await $fetch('/api/me/update-password', {
        method: 'POST',
        body: { currentPassword, password }
      });
      toast.add({
        title: 'Your password has been updated successfully',
        color: 'success'
      });
    } catch (error) {
      console.error(error);
      toast.add({
        title: error.data.message,
        color: 'error'
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    updateUser,
    updatePassword,
    schema,
    passwordSchema
  };
};
