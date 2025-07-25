import type { Tool } from '~~/types/tool'

export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export enum OneTimePasswordTypes {
  signup = 'SIGNUP',
  login = 'LOGIN',
  forgotPassword = 'FORGOT_PASSWORD',
}

export const SerpTools: readonly [
  Tool<'website_screenshot'>,
  Tool<'bulk_ai_images'>,
] = [
  {
    icon: 'i-lucide-scan-eye',
    title: 'Website Screenshot Generator',
    shortTitle: 'Website Screenshot',
    description: 'Capture and analyze screenshots of your website.',
    path: '/tools/screenshots',
    type: 'website_screenshot',
    cost: {
      visible: 2,
      fullPage: 4,
      scrollingAnimation: 6,
    },
  },
  {
    icon: 'i-lucide-images',
    title: 'Bulk AI Images Generator',
    shortTitle: 'Bulk AI Images',
    description: 'Create hundreds of unique visuals from a single prompt or a CSV file.',
    path: '/tools/bulk-ai-images',
    type: 'bulk_ai_images',
    cost: 4,
  },
]

export const PURCHASE_METHOD: 'one_time' | 'subscription' = 'one_time'

export const MIN_IMAGE_COUNT = 1
export const MAX_IMAGE_COUNT = 50
export const MAX_IMAGE_PER_PROMPT = 10
