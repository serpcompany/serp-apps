export async function addCreditsToUser(userId: string, credits: number, description?: string, stripeSessionId?: string) {
  try {
    await useDB().transaction(async (tx) => {
      await tx
        .update(tables.users)
        .set({
          credits: sql`${tables.users.credits} + ${credits}`,
        })
        .where(eq(tables.users.id, userId))

      await tx.insert(tables.creditsTransactions).values({
        userId,
        amount: credits,
        type: 'purchase',
        description: description || `Purchased ${credits} credits`,
        stripeSessionId,
      })
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
    const result = await useDB().transaction(async (tx) => {
      const user = await tx
        .select({ credits: tables.users.credits })
        .from(tables.users)
        .where(eq(tables.users.id, userId))
        .limit(1)

      if (!user[0] || user[0].credits < credits) {
        throw new Error('Insufficient credits')
      }

      await tx
        .update(tables.users)
        .set({
          credits: sql`${tables.users.credits} - ${credits}`,
        })
        .where(eq(tables.users.id, userId))

      await tx.insert(tables.creditsTransactions).values({
        userId,
        amount: -credits,
        type: 'usage',
        description,
      })

      return true
    })

    console.log(`Successfully deducted ${credits} credits from user ${userId}`)
    return result
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

export async function getUserCreditHistory(userId: string, limit = 50) {
  try {
    const transactions = await useDB()
      .select()
      .from(tables.creditsTransactions)
      .where(eq(tables.creditsTransactions.userId, userId))
      .orderBy(desc(tables.creditsTransactions.createdAt))
      .limit(limit)

    return transactions
  } catch (error) {
    console.error('Error getting credit history:', error)
    return []
  }
}
