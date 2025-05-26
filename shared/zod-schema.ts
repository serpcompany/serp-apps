import { insertUserSchema } from '@@/types/database';
import { z } from 'zod';

export const emailPasswordLoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8)
});

export const emailPasswordRegisterSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    name: z.string().min(1, 'Name is required'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export const emailSchema = z.object({
  email: z.string().email('Invalid email')
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8)
});

export const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string().optional()
});

export const updateUserPasswordSchema = z.object({
  password: z.string().min(8),
  currentPassword: z.string().min(8)
});

export const updateUserSchema = insertUserSchema.pick({
  name: true,
  avatarUrl: true
});

export const linkPasskeySchema = z.object({
  userName: z.string().email(),
  displayName: z.string().trim().optional()
});

export const deletePasskeySchema = z.object({
  credentialId: z.string()
});

export const otpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6)
});
