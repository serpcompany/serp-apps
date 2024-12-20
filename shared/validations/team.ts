import { z } from 'zod'
import { insertTeamSchema } from '@@/types/database'

export const createTeamSchema = insertTeamSchema.pick({
  name: true,
  logo: true,
  slug: true,
})
