import { FetchError } from 'ofetch'

interface AuthError {
  message: string
  statusCode?: number
  data?: any
}

interface AuthResponse {
  error?: AuthError
  success?: boolean
}

export const useAuth = () => {
  const toast = useToast()
  const { fetch: refreshSession } = useUserSession()

  const handleAuthError = (error: FetchError | any) => {
    const errorMessage = error?.data?.message || 'An unexpected error occurred'
    const statusCode = error?.data?.statusCode
    
    // Check if this is an unverified email error (from /api/auth/password/register)
    if (error?.data?.data?.needsVerification && error?.data?.data?.email) {
      const email = error.data.data.email
      
      // Add toast with action button
      toast.add({
        title: 'Email not verified',
        description: 'This email is registered but not verified.',
        color: 'warning',
        actions: [
          {
            icon: 'i-lucide-refresh-cw',
            label: 'Resend verification',
            onClick: async () => {
              if (email) {
                await resendVerification(email)
              }
            },
          }
        ]
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
      } as AuthError 
    }
  }

  const login = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
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

  const register = async (userData: {
    email: string
    password: string
    name: string
  }): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/register', {
        method: 'POST',
        body: userData,
      })
      return { success: true }
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

  const resetPassword = async (password: string, token: string): Promise<AuthResponse> => {
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
      // Use a custom error handler to avoid recursion with handleAuthError
      const errorMessage = error?.data?.message || 'Failed to send verification email'
      toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'error',
      })
      return { error: { message: errorMessage } as AuthError }
    }
  }

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    resendVerification,
  }
}
