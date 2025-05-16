import type { InsertUser, User } from '@@/types/database'
import { findLinkedOAuthAccounts } from '@@/server/database/queries/users'

export interface AuthError {
  statusCode: number
  statusMessage: string
  needsVerification?: boolean
  email?: string
}

export const sanitizeUser = (user: InsertUser, includeBannedData: boolean = false) => {
  delete user.hashedPassword
  delete user.createdAt
  delete user.updatedAt
  delete user.lastActive
  delete user.phoneNumber
  if (includeBannedData) {
    delete user.banned
    delete user.bannedUntil
    delete user.bannedReason
  }
  return user
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

/**
 * Check OAuth accounts for a user and throw an error if they should use OAuth instead
 */
export async function checkIfUserShouldUseOAuth(user: User) {
  if (!user.hashedPassword && user.emailVerified) {
    const linkedAccounts = await findLinkedOAuthAccounts(user.id)
    const providers = linkedAccounts.map((account) => account.provider)

    if (providers.length > 0) {
      const formatProviderName = (provider: string) =>
        provider.charAt(0).toUpperCase() + provider.slice(1)
      const formattedProviders = providers.map(formatProviderName)

      const providerList = formattedProviders.length > 1
        ? formattedProviders.slice(0, -1).join(', ') + ' and ' + formattedProviders.slice(-1)[0]
        : formattedProviders[0]

      throw createError({
        statusCode: 400,
        statusMessage: `Your account is linked to ${providerList}. Please sign in using ${providers.length > 1 ? 'one of these providers' : 'this provider'} instead of password.`,
      })
    }
  }
}

/**
 * Validate user email verification status
 */
export function validateEmailVerification(user: InsertUser) {
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email not verified',
      needsVerification: true,
      email: user.email,
    } as AuthError)
  }
}

/**
 * Check if the user account is banned
 */
export function checkUserBanned(user: InsertUser) {
  if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned',
    })
  }
}

/**
 * Check if a user has a password and throw an error if not
 */
export function validateUserHasPassword(user: InsertUser) {
  if (!user.hashedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'This account was registered via a social login (e.g., Google, GitHub). Please use the same method to log in.',
    })
  }
}