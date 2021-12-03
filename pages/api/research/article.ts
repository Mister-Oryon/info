// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Article, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Article[]
  error?: {
    message: string
  }
}

async function researchArticle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const research: Article = req.body

  const events = await prisma.article.findMany({
    where: {
      AND: [
        {
          name: {
            contains: research.name ?? undefined,
          },
        },
        {
          eventId: {
            gt: research.eventId,
          },
        },
      ],
    },
  })

  return res.status(200).json({ status: 'ok', data: events })
}

export default withJsonEnforcer(researchArticle)
