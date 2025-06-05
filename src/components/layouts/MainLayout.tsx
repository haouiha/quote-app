import React from 'react'

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='max-w-4xl mx-auto'>
					<div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default MainLayout
