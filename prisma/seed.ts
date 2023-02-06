import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'you',
    email: 'you@example.com',
  },
  {
    name: 'hoge',
    email: 'hoge@example.com',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })