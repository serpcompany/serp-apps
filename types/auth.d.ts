import type { User as DrizzleUser } from './database'

declare module '#auth-utils' {
  interface User
    extends Omit<
      DrizzleUser,
      | 'hashedPassword'
      | 'banned'
      | 'bannedReason'
      | 'bannedUntil'
      | 'createdAt'
      | 'updatedAt'
    > {}
}

export {}
