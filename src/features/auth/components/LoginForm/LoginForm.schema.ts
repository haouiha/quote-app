import { z } from 'zod'

export const loginSchema = z.object({
	username: z.string().min(1, 'Username is required').min(3, 'Username must be at least 3 characters'),
	password: z.string().min(1, 'Password is required'),
})

export type LoginFormData = z.infer<typeof loginSchema>
