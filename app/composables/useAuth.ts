interface AuthError {
  message: string
  statusCode?: number
}

interface AuthResponse {
  error?: AuthError
  success?: boolean
}

export const useAuth = () => {
  const toast = useToast()
  const { fetch: refreshSession, clear, user } = useUserSession()

  const handleAuthError = (error: any) => {
    const errorMessage = error?.data?.message || 'An unexpected error occurred'
    toast.add({
      title: 'Error',
      description: errorMessage,
      color: 'error',
    })
    return { error: { message: errorMessage } as AuthError }
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
    } catch (error) {
      return handleAuthError(error)
    }
  }

  const logout = async () => {
    await clear()
    useState('teamSlug').value = ''
    useState('teams').value = []
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      return handleAuthError(error)
    }
  }

  return {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
  }
}
