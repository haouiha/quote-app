import { VoteType } from '@prisma/client'
import { Quote } from '@/features/quotes/types'

interface QuoteCardProps {
	quote: Quote
	onVote: (quoteId: string, voteType: VoteType) => void
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onVote }) => {
	const handleVote = (voteType: VoteType) => {
		onVote(quote.id, voteType)
	}

	return (
		<div className='bg-gray-50 rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300'>
			<div className='flex justify-between items-center gap-6'>
				<div className='text-lg text-gray-700 flex-1 leading-relaxed'>{quote.text}</div>

				<div className='flex flex-col items-end gap-3'>
					<div className='flex items-center gap-3'>
						<button
							onClick={() => handleVote(VoteType.LIKE)}
							className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
								quote.userVote === VoteType.LIKE
									? 'bg-green-100 text-green-600 shadow-inner'
									: 'bg-gray-200 hover:bg-green-100 text-gray-600 hover:text-green-600 hover:shadow-md'
							}`}
						>
							<svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='font-medium'>{quote.likeCount}</span>
						</button>

						<button
							onClick={() => handleVote(VoteType.DISLIKE)}
							className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
								quote.userVote === VoteType.DISLIKE
									? 'bg-red-100 text-red-600 shadow-inner'
									: 'bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 hover:shadow-md'
							}`}
						>
							<svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='font-medium'>{quote.dislikeCount}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
