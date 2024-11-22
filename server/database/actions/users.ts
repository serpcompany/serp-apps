import { eq } from 'drizzle-orm'
import type { User, InsertUser } from '../../../types/database'

export async function findUserByEmail(email: string): Promise<User | null> {
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

export async function createUserWithPassword(payload: InsertUser) {
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

export async function findLinkedAccountsByUserId(userId: string) {
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

export async function updateLastActiveTimestamp(userId: string): Promise<InsertUser> {
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
