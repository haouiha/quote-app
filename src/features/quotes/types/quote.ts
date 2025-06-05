import { VoteType } from '@prisma/client'

export interface Quote {
	id: string
	text: string
	likeCount: number
	dislikeCount: number
	userVote: VoteType | null
	createdAt: string
}

export interface GetQuotesResponse {
	quotes: Quote[]
	pagination: {
		total: number
		page: number
		limit: number
		totalPages: number
	}
}

export interface VoteQuoteResponse {
	message: string
}
