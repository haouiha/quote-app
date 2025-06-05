import React, { useState } from 'react'

interface QuoteListControlsProps {
	search: string
	onSubmitSearch: (search: string) => void
	sortBy: string
	order: string
	onSort: (sortBy: string, order: string) => void
}

export const QuoteListControls: React.FC<QuoteListControlsProps> = ({
	search,
	onSubmitSearch,
	sortBy,
	order,
	onSort,
}) => {
	const [searchValue, setSearchValue] = useState(search)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmitSearch(searchValue)
	}

	return (
		<div className='mb-8 flex gap-4'>
			<form onSubmit={handleSubmit} className='flex-1 flex gap-3'>
				<input
					type='text'
					placeholder='Search quotes...'
					className='flex-1 px-4 py-2.5 bg-white border rounded-lg focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 '
					value={searchValue}
					onChange={handleSearch}
				/>
				<button
					type='submit'
					className='px-6 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 '
				>
					Search
				</button>
			</form>
			<select
				className='px-4 py-2.5 bg-white border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 cursor-pointer'
				value={`${sortBy}-${order}`}
				onChange={(e) => {
					const [newSortBy, newOrder] = e.target.value.split('-')
					onSort(newSortBy, newOrder)
				}}
			>
				<option value='createdAt-asc'>Oldest First</option>
				<option value='createdAt-desc'>Newest First</option>
			</select>
		</div>
	)
}
