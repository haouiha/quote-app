'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

interface AuthLayoutProps {
	children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	const { status } = useSession()

	useEffect(() => {
		if (status === 'authenticated') {
			redirect('/')
		}
	}, [status])

	if (status === 'loading') return null

	return children
}

export default AuthLayout
