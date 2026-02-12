import 'dotenv/config'
import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

console.log(process.env.DATABASE_URL)

app.post('/users', async (request, reply) => {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})
