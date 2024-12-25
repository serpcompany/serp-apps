import { z } from 'zod'
const toast = useToast()
import {
  emailSchema,
  loginUserSchema,
  registerUserSchema,
  otpLoginSchema,
  phoneSchema,
} from '@@/shared/validations/auth'

export const useAuth = () => {
  const { fetch: refreshSession } = useUserSession()
  const loading = ref(false)

  // Shared state for magic link and phone auth
  const mode = ref<'login' | 'otp'>('login')

  // Password Login
  const loginState = reactive({
    email: undefined as string | undefined,
    password: undefined as string | undefined,
  })

  const handlePasswordLogin = async (
    credentials: z.output<typeof loginUserSchema>,
  ) => {
    try {
      loading.value = true
      await $fetch('/api/auth/password/login', {
        method: 'POST',
        body: credentials,
      })
      await refreshSession()
      toast.add({
        title: 'Logged in successfully',
        color: 'success',
      })
      return navigateTo('/dashboard')
    } catch (error: any) {
      toast.add({
        title: 'Login failed',
        description: error.data?.message,
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  // Registration
  const registerState = reactive({
    email: undefined as string | undefined,
    password: undefined as string | undefined,
    name: undefined as string | undefined,
  })

  const handleRegistration = async (
    userData: z.output<typeof registerUserSchema>,
  ) => {
    try {
      loading.value = true
      await $fetch('/api/auth/password/register', {
        method: 'POST',
        body: userData,
      })
      return true
    } catch (error: any) {
      toast.add({
        title: 'Registration failed',
        description: error.data?.message,
        color: 'error',
      })
      return false
    } finally {
      loading.value = false
    }
  }

  // Magic Link
  const magicLinkState = reactive({
    email: undefined as string | undefined,
    code: undefined as string | undefined,
  })

  const handleMagicLinkLogin = async (email: string) => {
    try {
      loading.value = true
      await $fetch('/api/auth/magic-link/login', {
        method: 'POST',
        body: { email },
      })
      mode.value = 'otp'
      magicLinkState.email = email
      return true
    } catch (error: any) {
      toast.add({
        title: 'Login failed',
        description: error.data?.message,
        color: 'error',
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const handleMagicLinkVerification = async (
    verificationData: z.output<typeof otpLoginSchema>,
  ) => {
    try {
      loading.value = true
      await $fetch('/api/auth/magic-link/verify-otp', {
        method: 'POST',
        body: verificationData,
      })
      await refreshSession()
      return navigateTo('/dashboard')
    } catch (error: any) {
      toast.add({
        title: 'Login failed',
        description: error.data?.message,
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  // Phone Authentication
  const phoneState = reactive({
    phoneNumber: undefined as string | undefined,
    code: undefined as string | undefined,
  })

  const handlePhoneLogin = async (phoneData: z.output<typeof phoneSchema>) => {
    try {
      loading.value = true
      await $fetch('/api/auth/phone/login', {
        method: 'POST',
        body: phoneData,
      })
      mode.value = 'otp'
      phoneState.phoneNumber = phoneData.phoneNumber
      return true
    } catch (error: any) {
      toast.add({
        title: 'Login failed',
        description: error.data?.message,
        color: 'error',
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const handlePhoneVerification = async (verificationData: {
    phoneNumber: string
    code: string
  }) => {
    try {
      loading.value = true
      await $fetch('/api/auth/phone/verify', {
        method: 'POST',
        body: verificationData,
      })
      await refreshSession()
      return navigateTo('/dashboard')
    } catch (error: any) {
      toast.add({
        title: 'Login failed',
        description: error.data?.message,
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  // Password Reset
  const handleForgotPassword = async (email: string) => {
    try {
      loading.value = true
      await $fetch('/api/auth/password/forgot', {
        method: 'POST',
        body: { email },
      })
      toast.add({
        title: 'Password reset instructions sent',
        description:
          'If the email is correct, you will receive a password reset link.',
        color: 'success',
      })
      return true
    } catch (error: any) {
      toast.add({
        title: 'Failed to send reset instructions',
        description: error.data?.message,
        color: 'error',
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const handleResetPassword = async (token: string, password: string) => {
    try {
      loading.value = true
      await $fetch('/api/auth/password/reset', {
        method: 'POST',
        body: { token, password },
      })
      toast.add({
        title: 'Password reset successfully',
        color: 'success',
      })
      return navigateTo('/auth/login')
    } catch (error: any) {
      toast.add({
        title: 'Failed to reset password',
        description: error.data?.message,
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    mode,
    // States
    loginState,
    registerState,
    magicLinkState,
    phoneState,
    // Methods
    handlePasswordLogin,
    handleRegistration,
    handleMagicLinkLogin,
    handleMagicLinkVerification,
    handlePhoneLogin,
    handlePhoneVerification,
    handleForgotPassword,
    handleResetPassword,
  }
}
