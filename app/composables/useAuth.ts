import type { z } from 'zod';
import { FetchError } from 'ofetch';
import { emailPasswordLoginSchema, emailPasswordRegisterSchema } from '@@/shared/zod-schema';

export const useAuth = () => {
  const { fetch: refreshSession, clear } = useUserSession();
  const toast = useToast();

  const login = async (data: z.output<typeof emailPasswordLoginSchema>) => {
    try {
      await $fetch('/api/auth/password/login', {
        method: 'POST',
        body: data
      });
      await refreshSession();
      toast.add({ title: 'Logged in successfully', color: 'success' });
      await navigateTo('/dashboard');
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: 'Error',
          description: error.data.message,
          color: 'error'
        });
      }
      throw error;
    }
  };

  const register = async (data: z.output<typeof emailPasswordRegisterSchema>) => {
    try {
      const user = await $fetch('/api/auth/password/register', {
        method: 'POST',
        body: data
      });

      if (user.emailVerified) {
        await refreshSession();
        await navigateTo('/dashboard');
        return { emailVerified: true };
      }

      return { emailVerified: false };
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: 'Error',
          description: error.data.message,
          color: 'error'
        });
      }
      throw error;
    }
  };

  const logout = async () => {
    await clear();
    await navigateTo('/auth/login');
  };

  const forgotPassword = async (email: string) => {
    try {
      await $fetch('/api/auth/password/forgot', {
        method: 'POST',
        body: { email }
      });
      toast.add({
        title: 'If the email is correct, you will receive a password reset link.',
        color: 'success'
      });
      return { success: true };
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: 'Error',
          description: error.data.message,
          color: 'error'
        });
      }
      throw error;
    }
  };

  const resetPassword = async (password: string, token: string) => {
    try {
      await $fetch('/api/auth/password/reset', {
        method: 'POST',
        body: { password, token }
      });
      toast.add({
        title: 'Password reset successfully',
        color: 'success'
      });
      return { success: true };
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: 'Error',
          description: error.data.message,
          color: 'error'
        });
      }
    }
  };

  const resendVerification = async (email: string) => {
    try {
      await $fetch('/api/auth/password/resend-verification', {
        method: 'POST',
        body: { email }
      });
      toast.add({
        title: 'Verification email sent',
        description: 'Please check your inbox',
        color: 'success',
        duration: 5000
      });
      return { success: true };
    } catch (error) {
      if (error instanceof FetchError) {
        toast.add({
          title: 'Error',
          description: error.data.message,
          color: 'error'
        });
      }
      throw error;
    }
  };

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    resendVerification
  };
};
