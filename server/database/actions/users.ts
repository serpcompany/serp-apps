import { eq } from 'drizzle-orm'
import type { User, InsertUser } from '../../../types/database'

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [existingUser] = await useDB()
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
    return existingUser || null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createUserWithPassword = async (payload: InsertUser) => {
  try {
    const record = await useDB()
      .insert(tables.users)
      .values(payload)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: {
          name: payload.name,
          hashedPassword: payload.hashedPassword,
        },
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to upsert user')
  }
}

export const findLinkedAccountsByUserId = async (userId: string) => {
  try {
    const linkedAccounts = await useDB()
      .select()
      .from(tables.oauthAccounts)
      .where(eq(tables.oauthAccounts.userId, userId))
    return linkedAccounts
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find linked accounts by user ID')
  }
}

export const updateLastActiveTimestamp = async (
  userId: string,
): Promise<InsertUser> => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ lastActive: new Date() })
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update last active')
  }
}

export const findUserById = async (id: string) => {
  try {
    const [user] = await useDB()
      .select()
      .from(tables.users)
      .where(eq(tables.users.id, id))
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error('Failed to find user by ID')
  }
}

export const verifyUser = async (userId: string) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ emailVerified: true })
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to verify user')
  }
}

export const createUserWithOAuth = async (payload: InsertUser) => {
  try {
    const record = await useDB()
      .insert(tables.users)
      .values(payload)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: {
          name: payload.name,
          avatarUrl: payload.avatarUrl,
          emailVerified: true,
        },
      })
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user with OAuth')
  }
}

export const updateUser = async (userId: string, payload: Partial<User>) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set(payload)
      .where(eq(tables.users.id, userId))
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update user')
  }
}

export const linkOAuthAccount = async (
  userId: string,
  provider: string,
  providerUserId: string,
) => {
  try {
    const record = await useDB()
      .insert(tables.oauthAccounts)
      .values({
        userId,
        provider,
        providerUserId,
      })
      .onConflictDoNothing()
      .returning()
      .get()
    return record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to link OAuth account')
  }
}
