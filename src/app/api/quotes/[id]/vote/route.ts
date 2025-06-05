import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'
import { VoteType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

type Params = Promise<{ id: string }>

export async function POST(request: Request, { params }: { params: Params }) {
	try {
		const session = await getServerSession(authOptions)

		const { id } = await params
		const body = await request.json()
		const { type } = body
		const userId = session?.user?.id || ''

		// Validate vote type
		if (!type || !Object.values(VoteType).includes(type)) {
			return NextResponse.json({ error: 'Invalid vote type. Must be either LIKE or DISLIKE' }, { status: 400 })
		}

		// Validate user ID
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
		}

		// Check if quote exists
		const quote = await prisma.quote.findUnique({
			where: { id },
		})

		if (!quote) {
			return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
		}

		// Check if user exists
		const user = await prisma.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		// Check if user has already voted for this quote and if same vote type, delete the vote
		const existingVote = await prisma.vote.findUnique({
			where: {
				userId_quoteId: {
					userId,
					quoteId: id,
				},
			},
		})

		if (existingVote && existingVote.type === type) {
			await prisma.vote.delete({
				where: { id: existingVote.id },
			})

			return NextResponse.json({ message: 'Vote deleted successfully' })
		}

		// Create or update vote
		await prisma.vote.upsert({
			where: {
				userId_quoteId: {
					userId,
					quoteId: id,
				},
			},
			update: {
				type,
			},
			create: {
				userId,
				quoteId: id,
				type,
			},
		})

		return NextResponse.json({ message: 'Vote created/updated successfully' })
	} catch (error) {
		console.error('Vote error:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
