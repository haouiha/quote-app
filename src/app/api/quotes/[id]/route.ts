import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string }>

export async function GET(_: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const quote = await prisma.quote.findUnique({
			where: { id },
		})

		if (!quote) {
			return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
		}

		return NextResponse.json(quote)
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function PUT(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const body = await request.json()
		const { text } = body

		if (!text) {
			return NextResponse.json({ error: 'Quote text is required' }, { status: 400 })
		}

		// Check if quote exists
		const existingQuote = await prisma.quote.findUnique({
			where: { id },
		})

		if (!existingQuote) {
			return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
		}

		// Update the quote
		const updatedQuote = await prisma.quote.update({
			where: { id },
			data: { text },
		})

		return NextResponse.json(updatedQuote)
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function DELETE(_: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		// Check if quote exists
		const existingQuote = await prisma.quote.findUnique({
			where: { id },
		})

		if (!existingQuote) {
			return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
		}

		// Delete the quote
		await prisma.quote.delete({
			where: { id },
		})

		return NextResponse.json({ message: 'Quote deleted successfully' })
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
