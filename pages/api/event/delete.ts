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

async function _delete(req: NextApiRequest, res: NextApiResponse<Data>) {
  const event: Event = req.body

  if (!event.id) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'id undefined' } })
  }

  const eventExist = await prisma.event.findUnique({
    where: {
      id: Number(event.id),
    },
  })

  if (!eventExist) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'event not exist' } })
  }

  const deleteEvent = await prisma.event.delete({
    where: {
      id: Number(event.id),
    },
  })

  return res.status(200).json({ status: 'ok', data: deleteEvent })
}

export default withJsonEnforcer(_delete)
