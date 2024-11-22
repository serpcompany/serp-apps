import type { User as DrizzleUser } from './database'

declare module '#auth-utils' {
  interface User extends Omit<DrizzleUser, 'hashedPassword'> {}
}

export {}
