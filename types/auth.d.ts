import type { User as DrizzleUser } from './database';

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
    _impersonated?: boolean;
  }
}

interface UserSession {
  /**
   * Session ID
   */
  id?: string;
  /**
   * User session data, available on client and server
   */
  user?: SessionUser;
  /**
   * Private session data, only available on server/ code
   */
  secure?: SecureSessionData;
  /**
   * Extra session data, available on client and server
   */
  superAdmin?: boolean;
  [key: string]: unknown;
}

interface SecureSessionData {
  originalAdminSession: UserSessionRequired;
}
