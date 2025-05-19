import type { User, InsertUser } from '@@/types/database';

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const user = await useDB().query.users.findFirst({
    where: eq(tables.users.email, email)
  });
  return user;
};

export const createUserWithPassword = async (payload: InsertUser) => {
  try {
    const record = await useDB()
      .insert(tables.users)
      .values(payload)
      .onConflictDoUpdate({
        target: tables.users.email,
        set: {
          name: payload.name,
          hashedPassword: payload.hashedPassword
        }
      })
      .returning()
      .get();
    return record;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert user'
    });
  }
};

export const findLinkedOAuthAccounts = async (userId: string) => {
  const accounts = await useDB().query.oauthAccounts.findMany({
    where: eq(tables.oauthAccounts.userId, userId)
  });
  return accounts;
};

export const findUserById = async (id: string): Promise<User | undefined> => {
  const user = await useDB().query.users.findFirst({
    where: eq(tables.users.id, id)
  });
  return user;
};

export const updateLastActiveTimestamp = async (userId: string) => {
  await useDB()
    .update(tables.users)
    .set({
      lastActive: new Date()
    })
    .where(eq(tables.users.id, userId));
};

export const verifyUser = async (userId: string) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ emailVerified: true })
      .where(eq(tables.users.id, userId))
      .returning()
      .get();
    return record;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify user'
    });
  }
};

export const updateUser = async (userId: string, payload: Partial<User>) => {
  try {
    // Super admin cannot be updated - Makes sure no super admin can be created
    // Only way to create a super admin is either through the CLI or directly in the database
    if (payload.superAdmin) {
      delete payload.superAdmin;
    }
    const record = await useDB().update(tables.users).set(payload).where(eq(tables.users.id, userId)).returning().get();
    return record;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user'
    });
  }
};

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
          emailVerified: true
        }
      })
      .returning()
      .get();
    return record;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user with OAuth'
    });
  }
};

export const linkOAuthAccount = async (userId: string, provider: string, providerUserId: string) => {
  try {
    // First check if the record exists
    const [existingAccount] = await useDB()
      .select()
      .from(tables.oauthAccounts)
      .where(and(eq(tables.oauthAccounts.provider, provider), eq(tables.oauthAccounts.providerUserId, providerUserId)));

    if (existingAccount) {
      // Update if it exists
      return await useDB()
        .update(tables.oauthAccounts)
        .set({ userId })
        .where(eq(tables.oauthAccounts.id, existingAccount.id))
        .returning()
        .get();
    } else {
      // Insert if it doesn't exist
      return await useDB()
        .insert(tables.oauthAccounts)
        .values({
          userId,
          provider,
          providerUserId
        })
        .returning()
        .get();
    }
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to link OAuth account'
    });
  }
};

export const updateUserPassword = async (userId: string, hashedPassword: string) => {
  try {
    const record = await useDB()
      .update(tables.users)
      .set({ hashedPassword })
      .where(eq(tables.users.id, userId))
      .returning()
      .get();
    return record;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update user password');
  }
};
