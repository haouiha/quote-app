import { PrismaClient, VoteType } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
	try {
		// Clear existing data
		await prisma.vote.deleteMany()
		await prisma.user.deleteMany()
		await prisma.quote.deleteMany()

		const users = [
			{
				id: '1',
				name: 'User1',
				email: 'user1@example.com',
				username: 'user1',
				password: 'password',
			},
			{
				id: '2',
				name: 'User2',
				email: 'user2@example.com',
				username: 'user2',
				password: 'password',
			},
		]

		// Create demo user
		await prisma.user.createMany({
			data: users,
		})

		// Create demo quotes
		const quotes = [
			'ไม่มีลิมิต ชีวิตนอนน้อย',
			'จงเป็นศุกร์เป็นศุกร์เถิด อย่าได้มีจันทร์ถึงพฤหัสเลย',
			'อย่าให้พี่ต้องเปรี้ยว ขี่จักรยานมือเดียวก็ทำมาแล้ว',
			'หัวใจไม่ว่าง ส่วนปอด 2 ข้าง PM2.5 จอง',
			'หลายใจเราไม่ชอบ เบคอนกรอบๆ เราชอบมาก',
			'เงินเดือนหมื่นห้า ค่าเหล้าห้าหมื่น',
			'ยืนข้างใครนานๆ ไม่ได้หรอก เราเมื่อย',
			'ขยับตอนนี้เรียกออกกำลังกาย ขยับตอนใกล้ตายเรียกกายภาพบำบัด',
			'เขียน Resume ว่าสามารถทำงานภายใต้แรงกดดันได้…แต่พอเจอจริงๆ น้ำตาไหลเฉย',
			'HR บอกเดี๋ยวติดต่อกลับ…ตอนนี้ก็ยังรอสัญญาณจากจักรวาลอยู่',
		]

		for (const quote of quotes) {
			await prisma.quote.create({ data: { text: quote } })
		}

		// Get all created quotes
		const allQuotes = await prisma.quote.findMany()

		// Create some demo votes
		await prisma.vote.createMany({
			data: [
				// Like votes
				{
					userId: users[1].id,
					quoteId: allQuotes[0].id,
					type: VoteType.LIKE,
				},
				{
					userId: users[1].id,
					quoteId: allQuotes[1].id,
					type: VoteType.LIKE,
				},
				// Dislike votes
				{
					userId: users[1].id,
					quoteId: allQuotes[2].id,
					type: VoteType.DISLIKE,
				},
				{
					userId: users[1].id,
					quoteId: allQuotes[3].id,
					type: VoteType.DISLIKE,
				},
			],
		})

		console.log('Demo data seeded successfully')
	} catch (error) {
		console.error('Seeding failed:', error)
		throw error
	}
}

seed()
	.catch((error) => {
		console.error('Fatal error:', error)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
