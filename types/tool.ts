export type ToolType = 'website_screenshot' | 'bulk_ai_images'

export type ToolCost = number | { [mode: string]: number }

export type Tool = {
  icon: string
  title: string
  description: string
  path: string
  type: ToolType
  cost: ToolCost
}
