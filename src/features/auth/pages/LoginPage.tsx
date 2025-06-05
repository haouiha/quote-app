'use client'

import { LoginForm, LoginFormData } from '@/features/auth/components'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export const LoginPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const handleSubmit = async (data: LoginFormData) => {
		const result = await signIn('sample-credentials', {
			...data,
			redirect: false,
		})

		if (result?.ok) {
			router.push(callbackUrl)
		}

		if (result?.error) {
			throw new Error(result.error)
		}
	}

	return (
		<div className='space-y-8'>
			<div className='text-center'>
				<h2 className='text-4xl font-bold tracking-tight text-gray-900'>Welcome back</h2>
				<p className='mt-2 text-sm text-gray-600'>Please sign in to your account</p>
			</div>
			<LoginForm onSubmit={handleSubmit} />
		</div>
	)
}
