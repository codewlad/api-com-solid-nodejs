import fastify from 'fastify'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

export const app = fastify()

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

prisma.user.create({
  data: {
    name: 'Wladimir Ferreira',
    email: 'wladimir.ferreira@example.com',
  },
})
