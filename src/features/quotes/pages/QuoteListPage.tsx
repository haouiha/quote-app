import { VoteType } from '@prisma/client'
import { useGetQuotes, useQuoteListControls, useVoteQuote } from '@/features/quotes/hooks'
import { Pagination, QuoteCard, QuoteListControls } from '@/features/quotes/components'

export const QuoteListPage = () => {
	const { params, onSubmitSearch, onSort, onLimitChange, onPageChange } = useQuoteListControls()
	const { data, isLoading } = useGetQuotes(params)
	const voteMutation = useVoteQuote()

	const handleVote = (quoteId: string, voteType: VoteType) => {
		voteMutation.mutate({ quoteId, voteType })
	}

	return (
		<div className='min-h-screen'>
			<QuoteListControls
				search={params.search}
				sortBy={params.sortBy}
				order={params.order}
				onSubmitSearch={onSubmitSearch}
				onSort={onSort}
			/>

			{isLoading ? (
				<div className='flex justify-center items-center py-12'>
					<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500' />
				</div>
			) : data?.quotes.length ? (
				<>
					<div className='space-y-6'>
						{data.quotes.map((quote) => (
							<QuoteCard key={quote.id} quote={quote} onVote={handleVote} />
						))}
					</div>

					<div className='mt-8 flex justify-center'>
						<Pagination
							currentPage={params.page}
							totalPages={data.pagination.totalPages}
							onPageChange={onPageChange}
							limit={params.limit}
							onLimitChange={onLimitChange}
						/>
					</div>
				</>
			) : (
				<div className='text-center py-12'>
					<p className='text-gray-500 text-lg'>No quotes found</p>
				</div>
			)}
		</div>
	)
}
