'use client'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface ProtectedLayoutProps {
	children: ReactNode
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
	const pathname = usePathname()
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated: () => {
			redirect(`/login?callbackUrl=${pathname}`)
		},
	})

	if (status === 'loading') return null

	return !session ? null : children
}

export default ProtectedLayout
