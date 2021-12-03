// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Article, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Article
  error?: {
    message: string
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse<Data>) {
  const article: Article = req.body

  if (!article.id) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'id undefined' } })
  }

  const articleExist = await prisma.article.findUnique({
    where: {
      id: Number(article.id),
    },
  })

  if (!articleExist) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'article not exist' } })
  }

  const deleteArticle = await prisma.article.delete({
    where: {
      id: Number(article.id),
    },
  })

  return res.status(200).json({ status: 'ok', data: deleteArticle })
}

export default withJsonEnforcer(_delete)
