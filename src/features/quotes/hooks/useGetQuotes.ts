import { useQuery } from '@tanstack/react-query'
import { getQuotes } from '@/features/quotes/services'
import { GetQuotesResponse } from '@/features/quotes/types'

interface GetQuotesParams {
	search?: string
	sortBy?: string
	order?: string
	page?: number
	limit?: number
}

export const useGetQuotes = (params: GetQuotesParams) => {
	const queryString = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value) queryString.set(key, String(value))
	})

	const query = useQuery<GetQuotesResponse>({
		queryKey: ['quotes', params],
		queryFn: () => getQuotes(queryString.toString()),
	})

	return query
}
