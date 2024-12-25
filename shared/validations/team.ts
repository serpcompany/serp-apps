import { z } from 'zod'
import { insertTeamSchema } from '@@/types/database'

export const createTeamSchema = insertTeamSchema.pick({
  name: true,
  logo: true,
  slug: true,
})

export const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['owner', 'admin', 'member']).default('member'),
})
