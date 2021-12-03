// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Event, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Event[]
  error?: {
    message: string
  }
}

async function researchEvent(req: NextApiRequest, res: NextApiResponse<Data>) {
  const research: Event = req.body

  const events = await prisma.event.findMany({
    where: {
      AND: [
        {
          name: {
            contains: research.name ?? undefined,
          },
        },
        {
          date: {
            gte: research.date ?? undefined,
          },
        },
      ],
    },
  })

  return res.status(200).json({ status: 'ok', data: events })
}

export default withJsonEnforcer(researchEvent)
