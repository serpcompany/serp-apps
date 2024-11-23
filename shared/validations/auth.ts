import { z } from 'zod'

export const registerUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
  name: z.string().min(1).max(100),
})

export const loginUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
})

export const magicLinkLoginSchema = z.object({
  email: z.string().email(),
})

export const otpLoginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const otpVerificationSchema = z.object({
  email: z.string().email(),
  code: z.number().min(6).max(6),
})
