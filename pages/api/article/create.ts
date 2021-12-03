// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Article, Event, PrismaClient } from '@prisma/client'
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
  const article: Article = req.body

  if (!article.name) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'name undefined' } })
  } else if (!article.content) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'content undefined' } })
  } else if (!article.eventId) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'eventId undefined' } })
  }

  const newArticle = await prisma.event.update({
    where: { id: Number(article.eventId) },
    data: {
      Article: {
        create: { name: article.name, content: article.content },
      },
    },
  })

  return res.status(200).json({ status: 'ok', data: newArticle })
}

export default withJsonEnforcer(create)
