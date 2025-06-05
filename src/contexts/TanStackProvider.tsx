'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/libs/tanstack'

interface TanStackProviderProps {
	children: React.ReactNode
}

const TanStackProvider = ({ children }: TanStackProviderProps) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default TanStackProvider
