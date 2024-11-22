import { InsertUser } from '@@/types/database'

export const sanitizeUser = (
  user: InsertUser,
  showBannedData: boolean = false,
) => {
  if (!user) return null
  if (!showBannedData) {
    delete user.banned
    delete user.bannedReason
  }
  delete user.hashedPassword
  return user
}

/**
 * Checks if a date is within the expiry date.
 *
 * @param expiresAt - The date to check.
 * @returns True if the date has not expired, false otherwise.
 */
export function isWithinExpiryDate(expiresAt: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < expiresAt
}
