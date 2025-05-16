import type { User as DrizzleUser } from './database'


declare module '#auth-utils' {
  interface User extends DrizzleUser {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    hashedPassword: string | null;
    banned: boolean;
    bannedReason: string | null;
    emailVerified: boolean;
    superAdmin: boolean;
    phoneNumber: string | null;
    bannedUntil: Date | null;
    onboarded: boolean;
    proAccount: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastActive: Date | null;
  }
}