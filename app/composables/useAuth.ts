import { z } from 'zod'
import { FetchError } from 'ofetch'
import { registerUserSchema } from '@@/shared/validations/auth'
type RegisterUserSchema = z.output<typeof registerUserSchema>

interface AuthError {
  message: string
  statusCode?: number
  data?: any
}

interface AuthResponse {
  error?: AuthError
  success?: boolean
  emailVerified?: boolean
}

export const useAuth = () => {
  const toast = useToast()
  const { fetch: refreshSession, clear, user } = useUserSession()

  const handleAuthError = (error: FetchError | any) => {
    const errorMessage = error?.data?.message || 'An unexpected error occurred'
    const statusCode = error?.data?.statusCode

    // Check if this is an unverified email error
    if (error?.data?.data?.needsVerification && error?.data?.data?.email) {
      const email = error.data.data.email

      // Add toast with action button
      toast.add({
        title: 'Email not verified',
        description: 'This email is registered but not verified.',
        actions: [
          {
            label: 'Resend Verification Email',
            onClick: async () => {
              if (email) {
                await resendVerification(email)
              }
            },
          },
        ],
      })
    } else {
      // Regular error toast
      toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'error',
      })
    }

    return {
      error: {
        message: errorMessage,
        statusCode,
        data: error?.data?.data,
      } as AuthError,
    }
  }

  const login = async (credentials: {
    email: string
    password: string
  }): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/login', {
        method: 'POST',
        body: credentials,
      })
      await refreshSession()
      toast.add({ title: 'Logged in successfully', color: 'success' })
      return { success: true }
    } catch (error: FetchError | any) {
      return handleAuthError(error)
    }
  }

  const logout = async () => {
    await clear()
    useState('teamSlug').value = ''
    useState('teams').value = []
  }

  const register = async (userData: RegisterUserSchema): Promise<AuthResponse> => {
    try {
      const user = await $fetch('/api/auth/password/register', {
        method: 'POST',
        body: userData,
      })
      return { success: true, emailVerified: user?.emailVerified }
    } catch (error: FetchError | any) {
      return handleAuthError(error)
    }
  }

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/forgot', {
        method: 'POST',
        body: { email },
      })
      toast.add({
        title:
          'If the email is correct, you will receive a password reset link.',
        color: 'success',
      })
      return { success: true }
    } catch (error: FetchError | any) {
      return handleAuthError(error)
    }
  }

  const resetPassword = async (
    password: string,
    token: string,
  ): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/reset', {
        method: 'POST',
        body: { password, token },
      })
      toast.add({
        title: 'Password reset successfully',
        color: 'success',
      })
      return { success: true }
    } catch (error: FetchError | any) {
      return handleAuthError(error)
    }
  }

  const resendVerification = async (email: string): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/resend-verification', {
        method: 'POST',
        body: { email },
      })
      toast.add({
        title: 'Verification email sent',
        description: 'Please check your inbox',
        color: 'success',
        duration: 5000,
      })
      return { success: true }
    } catch (error: FetchError | any) {
      // Use the same error handler for consistency
      return handleAuthError(error)
    }
  }

  return {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    resendVerification,
  }
}
