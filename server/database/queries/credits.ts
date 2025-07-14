export async function addCreditsToUser(
  userId: string,
  credits: number,
  type: 'purchase' | 'refund' | 'bonus' = 'purchase',
  description?: string,
  stripeSessionId?: string) {
  try {
    await useDB()
      .update(tables.users)
      .set({
        credits: sql`${tables.users.credits} + ${credits}`,
      })
      .where(eq(tables.users.id, userId))

    if (!description) {
      switch (type) {
        case 'purchase':
          description = `Purchased ${credits} credits`
          break
        case 'refund':
          description = `Refunded ${credits} credits`
          break
        case 'bonus':
          description = `Received ${credits} bonus credits`
      }
    }

    await useDB().insert(tables.creditsTransactions).values({
      userId,
      amount: credits,
      type,
      description,
      stripeSessionId,
    })

    console.log(`Successfully added ${credits} credits to user ${userId}`)
    return true
  } catch (error) {
    console.error('Error adding credits to user:', error)
    throw error
  }
}

export async function deductCreditsFromUser(userId: string, credits: number, description: string) {
  try {
    const result = await useDB()
      .update(tables.users)
      .set({
        credits: sql`${tables.users.credits} - ${credits}`,
      })
      .where(and(eq(tables.users.id, userId), gte(tables.users.credits, credits)))

    if (result.meta.changes === 0) {
      throw new Error('Insufficient credits')
    }

    await useDB().insert(tables.creditsTransactions).values({
      userId,
      amount: -credits,
      type: 'usage',
      description,
    })

    console.log(`Successfully deducted ${credits} credits from user ${userId}`)
  } catch (error) {
    console.error('Error deducting credits:', error)
    throw error
  }
}

export async function getUserCredits(userId: string) {
  try {
    const result = await useDB()
      .select({ credits: tables.users.credits })
      .from(tables.users)
      .where(eq(tables.users.id, userId))
      .limit(1)

    return result[0]?.credits || 0
  } catch (error) {
    console.error('Error getting user credits:', error)
    return 0
  }
}

export async function getUserCreditHistory(userId: string, page: number, limit: number) {
  try {
    const transactions = await useDB()
      .query
      .creditsTransactions
      .findMany({
        where: eq(tables.creditsTransactions.userId, userId),
        orderBy: [desc(tables.creditsTransactions.createdAt)],
        limit,
        offset: (page - 1) * limit,
      })

    const total = await useDB().$count(tables.creditsTransactions, eq(tables.creditsTransactions.userId, userId))
    return { transactions, total }
  } catch (error) {
    console.error('Error getting credits history:', error)
    throw error
  }
}
