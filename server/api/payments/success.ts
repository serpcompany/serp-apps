import { z } from 'zod'
import { getAllSubscriptions } from '@@/server/services/stripe'
import type { STRIPE_SUB_CACHE } from '@@/types/stripe'

export default defineEventHandler(async (event) => {
  return 'Hello Nitro'
})
