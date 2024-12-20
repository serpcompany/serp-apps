import { z } from 'zod'
import { insertUserSchema } from '@@/types/database'

export const updateUserSchema = insertUserSchema.pick({
  name: true,
  avatarUrl: true,
})
