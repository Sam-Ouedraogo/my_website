import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@samuelwouedraogo.com"
  const password = process.env.ADMIN_PASSWORD || "change-this-password"
  const name = "Samuel W. Ouedraogo"

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log(`Admin user already exists: ${email}`)
    return
  }

  const passwordHash = await hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
    },
  })

  console.log(`Admin user created: ${user.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
