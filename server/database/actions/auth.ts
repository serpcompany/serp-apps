import { eq } from 'drizzle-orm'
import type {
  InsertEmailVerificationCodes,
  InsertOneTimePasswords,
} from '../../../types/database'

export const generateAndSaveVerificationCode = async (
  payload: InsertEmailVerificationCodes,
) => {
  try {
    const record = await useDB()
      .insert(tables.emailVerificationCodes)
      .values(payload)
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create verification code')
  }
}

export const generateAndSaveOneTimePassword = async (
  payload: InsertOneTimePasswords,
) => {
  try {
    const record = await useDB()
      .insert(tables.oneTimePasswords)
      .values(payload)
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create one time password')
  }
}

export const findEmailVerificationCode = async (token: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.emailVerificationCodes)
      .where(eq(tables.emailVerificationCodes.code, token))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find verification code')
  }
}

export const deleteEmailVerificationCode = async (id: string) => {
  try {
    await useDB()
      .delete(tables.emailVerificationCodes)
      .where(eq(tables.emailVerificationCodes.id, id))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete verification code')
  }
}

export const findAndDeleteEmailVerificationCode = async (token: string) => {
  try {
    const [record] = await useDB()
      .delete(tables.emailVerificationCodes)
      .where(eq(tables.emailVerificationCodes.code, token))
      .returning({
        id: tables.emailVerificationCodes.id,
        userId: tables.emailVerificationCodes.userId,
        expiresAt: tables.emailVerificationCodes.expiresAt,
      })
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to process verification code')
  }
}
