// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Person, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Person[]
  error?: {
    message: string
  }
}

async function researchPerson(req: NextApiRequest, res: NextApiResponse<Data>) {
  const research: Person = req.body

  const persons = await prisma.person.findMany({
    where: {
      AND: [
        {
          lastName: {
            contains: research.lastName ?? undefined,
          },
        },
        {
          firstName: {
            contains: research.firstName ?? undefined,
          },
        },
        {
          dateBirth: {
            contains: research.dateBirth ?? undefined,
          },
        },
        {
          dateDeath: {
            contains: research.dateDeath ?? undefined,
          },
        },
      ],
    },
  })

  return res.status(200).json({ status: 'ok', data: persons })
}

export default withJsonEnforcer(researchPerson)
