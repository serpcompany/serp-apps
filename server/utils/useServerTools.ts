import { SerpTools } from '~~/constants'
import { addCreditsToUser, deductCreditsFromUser } from '~~/server/database/queries/credits'
import type { ToolType, ToolModeMap } from '~~/types/tool'

type CostCalculationOptions<T extends ToolType> = {
  mode?: ToolModeMap[T]
  count?: number
}

type DeductCreditsParams<T extends ToolType> = {
  userId: string
  description: string
  options?: CostCalculationOptions<T>
}

type RefundCreditsParams = {
  userId: string
  credits: number
  description: string
}

/**
 * A server-side composable to calculate credit costs and deduct them from a user's account.
 * @param toolType The unique identifier for the tool.
 */
export const useServerTool = <T extends ToolType>(toolType: T) => {
  const tool = SerpTools.find((t) => t.type === toolType)
  if (!tool) {
    throw new Error(`useServerTool Error: Tool with type "${toolType}" was not found.`)
  }

  const getRequiredCredits = (options: CostCalculationOptions<T> = {}): number => {
    const { cost } = tool

    if (typeof cost === 'number')
      return cost * (options.count ?? 1)

    if (typeof cost === 'object' && options.mode)
      return cost[options.mode]

    return 0
  }

  const deductCredits = async (params: DeductCreditsParams<T>) => {
    const { userId, description, options } = params
    const requiredCredits = getRequiredCredits(options)

    if (requiredCredits <= 0) {
      return requiredCredits
    }

    try {
      await deductCreditsFromUser(userId, requiredCredits, description)
      return requiredCredits
    } catch {
      throw createError({
        statusCode: 402,
        statusMessage: 'Insufficient credits to perform this action.',
      })
    }
  }

  const refundCredits = async (params: RefundCreditsParams) => {
    const { userId, credits, description } = params

    if (credits <= 0) {
      return
    }

    try {
      await addCreditsToUser(userId, credits, 'refund', description)
    } catch (error) {
      console.error('Failed to refund credits:', error)
    }
  }

  return {
    tool,
    getRequiredCredits,
    deductCredits,
    refundCredits,
  }
}
