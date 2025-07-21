import { SerpTools } from '~~/constants'
import type { ToolType } from '~~/types/tool'

type CostCalculationOptions = {
  mode?: string
  count?: number
}

/**
 * A composable to manage tool usage logic, primarily to check if sufficient credits available for tool use.
 * @param toolType The unique identifier for the tool.
 */
export const useTool = (toolType: ToolType) => {
  const tool = SerpTools.find((t) => t.type === toolType)
  if (!tool) {
    throw new Error(`useTool Error: Tool with value "${toolType}" was not found.`)
  }

  const { user, fetch: refreshUser } = useUserSession()
  const availableCredits = computed(() => user.value?.credits ?? 0)

  const getRequiredCredits = (options: CostCalculationOptions): number => {
    const { cost } = tool

    if (typeof cost === 'number') {
      return cost * (options.count ?? 1)
    }

    if (typeof cost === 'object' && options.mode) {
      return cost[options.mode] ?? 0
    }

    return 0
  }

  const isToolUsageAllowed = (options: CostCalculationOptions = {}): boolean => {
    const requiredCredits = getRequiredCredits(options)

    return requiredCredits === 0 || availableCredits.value >= requiredCredits
  }

  const refreshUserCredits = async () => {
    await refreshUser()
  }

  const insufficientCreditsAlert = computed(() => {
    const color = 'warning' as const
    return {
      title: 'Insufficient Credits!',
      description: 'You do not have enough credits to perform this action. Please purchase more to continue.',
      icon: 'i-lucide-triangle-alert',
      color,
      actions: [{
        label: 'Purchase Credits',
        color,
        to: '/dashboard/billing',
      }],
    }
  })

  return {
    tool,
    availableCredits,
    insufficientCreditsAlert,
    isToolUsageAllowed,
    getRequiredCredits,
    refreshUserCredits,
  }
}
