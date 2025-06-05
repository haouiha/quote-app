import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useQuoteListControls = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const currentSearch = searchParams.get('search') || ''
	const currentSortBy = searchParams.get('sortBy') || 'createdAt'
	const currentOrder = searchParams.get('order') || 'asc'
	const currentLimit = Number(searchParams.get('limit')) || 5
	const currentPage = Number(searchParams.get('page')) || 1

	const updateSearchParams = useCallback(
		(params: Record<string, string>) => {
			const newParams = new URLSearchParams(searchParams.toString())
			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					newParams.set(key, value)
				} else {
					newParams.delete(key)
				}
			})
			router.push(`${pathname}?${newParams.toString()}`)
		},
		[searchParams, router, pathname]
	)

	const handlePageChange = (page: number) => {
		updateSearchParams({ page: String(page) })
	}

	const handlePerPageChange = (limit: string) => {
		updateSearchParams({ limit, page: '1' })
	}

	const handleSubmitSearch = (search: string) => {
		updateSearchParams({ search, page: '1' })
	}

	const handleSort = (sortBy: string, order: string) => {
		updateSearchParams({ sortBy, order, page: '1' })
	}

	return {
		params: {
			search: currentSearch,
			sortBy: currentSortBy,
			order: currentOrder,
			limit: currentLimit,
			page: currentPage,
		},
		onSubmitSearch: handleSubmitSearch,
		onSort: handleSort,
		onLimitChange: handlePerPageChange,
		onPageChange: handlePageChange,
	}
}
