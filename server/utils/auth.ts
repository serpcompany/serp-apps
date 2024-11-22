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
