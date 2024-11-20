import type { UserRole } from '../constants'

declare module '#auth-utils' {
  interface User {
    id: string
    role: UserRole
    email: string
    emailVerified: boolean
    name: string
    avatarUrl?: string
    hashedPassword?: string
    banned: boolean
    bannedReason?: string
    onboarded?: boolean
    createdAt?: Date
    updatedAt?: Date
    lastActive?: Date
  }
}

export {}
