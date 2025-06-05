'use client'
import { QuoteListPage } from '@/features/quotes/pages/QuoteListPage'
import { signOut, useSession } from 'next-auth/react'

const Home = () => {
	const { data: session } = useSession()

	return <QuoteListPage />
}

export default Home
