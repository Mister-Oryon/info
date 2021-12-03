// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Event, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Event
  error?: {
    message: string
  }
}

async function create(req: NextApiRequest, res: NextApiResponse<Data>) {
  const event: Event = req.body

  if (!event.name) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'name undefined' } })
  }

  const newEvent = await prisma.event.create({
    data: { name: event.name, date: event.date },
  })

  return res.status(200).json({ status: 'ok', data: newEvent })
}

export default withJsonEnforcer(create)
