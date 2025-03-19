import { z } from 'zod'
import { validateBody } from '@@/server/utils/bodyValidation'

const schema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email('Invalid email'),
  message: z.string().min(1, 'Message is required'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, name, email, message } = schema.parse(body)
  // const feedback = await createFeedback({
  //   userId,
  //   name,
  //   email,
  //   message,
  // })
  return feedback
})
