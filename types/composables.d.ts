import type { z } from 'zod'
import type { emailPasswordLoginSchema, emailPasswordRegisterSchema } from '@@/shared/zod-schema'

interface UseAuth {
  login: (data: z.output<typeof emailPasswordLoginSchema>) => Promise<void>
  register: (data: z.output<typeof emailPasswordRegisterSchema>) => Promise<{ emailVerified: boolean }>
  logout: () => Promise<void>
}

declare global {
  const useAuth: () => UseAuth
}

export {} 