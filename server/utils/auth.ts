import type { User } from '#auth-utils'
import { InsertUser } from '@@/types/database'

export const sanitizeUser = (
  user: InsertUser,
  showBannedData: boolean = false,
) => {
  if (!showBannedData) {
    delete user.banned
    delete user.bannedReason
  }
  delete user.hashedPassword
  delete user.createdAt
  delete user.updatedAt
  delete user.lastActive
  delete user.phoneNumber
  return user as User
}

/**
 * Checks if a date is within the expiry date.
 *
 * @param expiresAt - The date to check.
 * @returns True if the date has not expired, false otherwise.
 */
export function isWithinExpiryDate(expiresAt: number): boolean {
  const currentTime = Date.now()
  return currentTime < expiresAt
}

export async function sendLoginNotification(user: { name: string; email: string }) {
  try {
    await $fetch('/api/auth/login-notification', {
      method: 'POST',
      body: { user }
    })
  } catch (error) {
    // Silently fail as this is not critical
    console.error('Failed to send login notification:', error)
  }
}
