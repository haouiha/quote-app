import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteQuote } from '@/features/quotes/services/quotes'
import { VoteQuoteResponse } from '@/features/quotes/types/quote'
import { VoteType } from '@prisma/client'

export const useVoteQuote = () => {
	const queryClient = useQueryClient()

	return useMutation<VoteQuoteResponse, Error, { quoteId: string; voteType: VoteType }>({
		mutationFn: ({ quoteId, voteType }) => voteQuote(quoteId, voteType),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['quotes'] })
		},
	})
}
