import prisma from '@/libs/prisma'
import { VoteType } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export async function GET(request: Request) {
	try {
		const session = await getServerSession(authOptions)
		const userId = session?.user?.id || ''

		const { searchParams } = new URL(request.url)
		const sortBy = searchParams.get('sortBy') || 'createdAt'
		const order = searchParams.get('order') || 'desc'
		const search = searchParams.get('search') || ''
		const page = parseInt(searchParams.get('page') || '1')
		const limit = parseInt(searchParams.get('limit') || '10')
		const startDate = searchParams.get('startDate')
		const endDate = searchParams.get('endDate')

		// Validate sortBy parameter
		const validSortFields = ['text', 'likes', 'dislikes', 'createdAt']
		if (!validSortFields.includes(sortBy)) {
			return NextResponse.json(
				{ error: `Invalid sort field. Valid fields are: ${validSortFields.join(', ')}` },
				{ status: 400 }
			)
		}

		// Validate order parameter
		const validOrderFields = ['asc', 'desc']
		if (!validOrderFields.includes(order)) {
			return NextResponse.json(
				{ error: `Invalid order. Valid fields are: ${validOrderFields.join(', ')}` },
				{ status: 400 }
			)
		}

		// Build where clause
		const where: any = {}

		// Add search condition
		if (search) {
			where.text = {
				contains: search.toLowerCase(),
			}
		}

		// Add date range filter
		if (startDate || endDate) {
			where.createdAt = {}
			if (startDate) {
				where.createdAt.gte = new Date(startDate)
			}
			if (endDate) {
				where.createdAt.lte = new Date(endDate)
			}
		}

		// Calculate pagination
		const skip = (page - 1) * limit

		// Get total count for pagination
		const total = await prisma.quote.count({ where })

		// Get paginated results
		const quotes = await prisma.quote.findMany({
			where,
			orderBy: {
				[sortBy]: order,
			},
			skip,
			take: limit,
			include: {
				votes: {
					where: {
						userId: userId,
					},
					select: {
						type: true,
					},
				},
			},
		})

		// Get vote counts for all quotes in a single query
		const voteCounts = await prisma.vote.groupBy({
			by: ['quoteId', 'type'],
			where: {
				quoteId: {
					in: quotes.map((q) => q.id),
				},
			},
			_count: true,
		})

		// Create a map of vote counts for easy lookup
		const voteCountMap = voteCounts.reduce((acc, curr) => {
			if (!acc[curr.quoteId]) {
				acc[curr.quoteId] = { likeCount: 0, dislikeCount: 0 }
			}
			if (curr.type === VoteType.LIKE) {
				acc[curr.quoteId].likeCount = curr._count
			} else {
				acc[curr.quoteId].dislikeCount = curr._count
			}
			return acc
		}, {} as Record<string, { likeCount: number; dislikeCount: number }>)

		const transformedQuotes = quotes.map((quote) => ({
			...quote,
			...(voteCountMap[quote.id] || { likeCount: 0, dislikeCount: 0 }),
			userVote: quote.votes[0]?.type || null,
			votes: undefined,
		}))

		return NextResponse.json({
			quotes: transformedQuotes,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		})
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { text } = body

		if (!text) {
			return NextResponse.json({ error: 'Quote text is required' }, { status: 400 })
		}

		const quote = await prisma.quote.create({
			data: {
				text,
			},
		})

		return NextResponse.json(quote, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
