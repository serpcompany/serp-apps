import { eq, lt, and } from 'drizzle-orm'
import type {
  InsertEmailVerificationCodes,
  InsertOneTimePasswords,
} from '../../../types/database'
import type { WebAuthnCredential } from '#auth-utils'
import { generateAlphaNumericCode } from '@@/server/utils/nanoid'

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

export const findCredentialByUserId = async (userId: string) => {
  try {
    const record = await useDB()
      .select()
      .from(tables.webAuthnCredentials)
      .where(eq(tables.webAuthnCredentials.userId, userId))
    return record
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to find credential by user id: ${error}`)
  }
}

export const storeWebAuthnChallenge = async (
  attemptId: string,
  challenge: string,
) => {
  try {
    try {
      await useDB()
        .insert(tables.webAuthnChallenges)
        .values({
          id: attemptId,
          challenge,
          expiresAt: new Date(Date.now() + 60000),
        })
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to store challenge: ${error}`)
    }
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to store challenge: ${error}`)
  }
}

export const getAndDeleteChallenge = async (attemptId: string) => {
  try {
    await useDB()
      .delete(tables.webAuthnChallenges)
      .where(lt(tables.webAuthnChallenges.expiresAt, new Date()))

    const record = await useDB()
      .select()
      .from(tables.webAuthnChallenges)
      .where(eq(tables.webAuthnChallenges.id, attemptId))
      .get()

    if (record) {
      await useDB()
        .delete(tables.webAuthnChallenges)
        .where(eq(tables.webAuthnChallenges.id, attemptId))
    }

    return record?.challenge
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to get challenge: ${error}`)
  }
}

export const findCredentialById = async (credentialId: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.webAuthnCredentials)
      .where(eq(tables.webAuthnCredentials.id, credentialId))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to find credential by id: ${error}`)
  }
}

export const createCredential = async (payload: {
  userId: string
  name: string
  id: string
  publicKey: string
  counter: number
  transports: WebAuthnCredential['transports']
  backedUp: boolean
}) => {
  try {
    const record = await useDB()
      .insert(tables.webAuthnCredentials)
      .values(payload)
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to create credential: ${error}`)
  }
}

export const deleteCredential = async (
  userId: string,
  credentialId: string,
) => {
  try {
    await useDB()
      .delete(tables.webAuthnCredentials)
      .where(
        and(
          eq(tables.webAuthnCredentials.userId, userId),
          eq(tables.webAuthnCredentials.id, credentialId),
        ),
      )
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to delete credential: ${error}`)
  }
}

export const createPasswordResetToken = async (userId: string) => {
  try {
    const token = generateAlphaNumericCode(32)
    const record = await useDB()
      .insert(tables.passwordResetTokens)
      .values({
        userId,
        code: token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create password reset token')
  }
}

export const findPasswordResetToken = async (token: string) => {
  try {
    const [record] = await useDB()
      .select()
      .from(tables.passwordResetTokens)
      .where(eq(tables.passwordResetTokens.code, token))
    return record || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find password reset token')
  }
}

export const deletePasswordResetToken = async (token: string) => {
  try {
    await useDB()
      .delete(tables.passwordResetTokens)
      .where(eq(tables.passwordResetTokens.code, token))
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete password reset token')
  }
}
