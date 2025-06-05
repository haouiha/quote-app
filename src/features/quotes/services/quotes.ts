import axiosClient from '@/libs/axios'
import { GetQuotesResponse, VoteQuoteResponse } from '@/features/quotes/types'
import { VoteType } from '@prisma/client'

export const getQuotes = async (queryString: string) => {
	try {
		const url = `/api/quotes?${queryString}`

		const response = await axiosClient.get<GetQuotesResponse>(url)

		return response.data
	} catch (error) {
		console.error('Error get quotes:', error)
		throw error
	}
}

export const voteQuote = async (quoteId: string, voteType: VoteType) => {
	try {
		const url = `/api/quotes/${quoteId}/vote`

		const response = await axiosClient.post<VoteQuoteResponse>(url, { type: voteType })
		return response.data
	} catch (error) {
		console.error('Error vote quote:', error)
		throw error
	}
}
