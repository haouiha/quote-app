import '@/styles/globals.css'
import type { Metadata } from 'next'
import { MainLayout } from '@/components'
import { NextAuthProvider, TanStackProvider } from '@/contexts'

export const metadata: Metadata = {
	title: 'Quotes App',
	description: 'Atichat Nilchat :: @haouiha',
}

interface RootLayoutProps {
	children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang='en'>
			<NextAuthProvider>
				<TanStackProvider>
					<body>
						<MainLayout>{children}</MainLayout>
					</body>
				</TanStackProvider>
			</NextAuthProvider>
		</html>
	)
}

export default RootLayout
