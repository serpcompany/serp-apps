export type ToolType = 'website_screenshot' | 'bulk_ai_images'

export const SCREENSHOT_MODES = ['visible', 'fullPage', 'scrollingAnimation'] as const
export type ScreenshotMode = typeof SCREENSHOT_MODES[number]

export type ToolModeMap = {
  website_screenshot: ScreenshotMode
  bulk_ai_images: never
}

export type ToolCost<T extends ToolType> = ToolModeMap[T] extends never
  ? number
  : { [K in ToolModeMap[T]]: number }

export type Tool<T extends ToolType = ToolType> = {
  icon: string
  title: string
  shortTitle: string
  description: string
  path: string
  type: T
  cost: ToolCost<T>
}
