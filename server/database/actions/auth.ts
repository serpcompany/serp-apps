import { eq } from 'drizzle-orm'
import type {
  InsertEmailVerificationCodes,
  InsertOneTimePasswords,
  OneTimePasswords,
} from '../../../types/database'

export const saveEmailVerificationCode = async (
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

export const saveOneTimePassword = async (payload: InsertOneTimePasswords) => {
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

export const deleteEmailVerificationCode = async (token: string) => {
  try {
    await useDB()
      .delete(tables.emailVerificationCodes)
      .where(eq(tables.emailVerificationCodes.code, token))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete verification code')
  }
}

export const findOneTimePassword = async (code: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.oneTimePasswords)
      .where(eq(tables.oneTimePasswords.code, code))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find one time password')
  }
}

export const deleteOneTimePassword = async (code: string) => {
  try {
    await useDB()
      .delete(tables.oneTimePasswords)
      .where(eq(tables.oneTimePasswords.code, code))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete one time password')
  }
}
