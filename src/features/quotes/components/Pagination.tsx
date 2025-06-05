import React from 'react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	limit: number
	onLimitChange: (limit: string) => void
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	limit,
	onLimitChange,
}) => {
	return (
		<div className='mt-8 flex justify-center gap-2'>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
			>
				Previous
			</button>

			<div className='flex items-center gap-2'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`px-4 py-2 border rounded ${
							currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
						}`}
					>
						{page}
					</button>
				))}
			</div>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
			>
				Next
			</button>

			<select className='px-4 py-2 border rounded' value={limit} onChange={(e) => onLimitChange(e.target.value)}>
				<option value='2'>2 per page</option>
				<option value='5'>5 per page</option>
				<option value='10'>10 per page</option>
				<option value='20'>20 per page</option>
			</select>
		</div>
	)
}
