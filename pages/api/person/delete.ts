// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Person, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Person
  error?: {
    message: string
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse<Data>) {
  const person: Person = req.body

  if (!person.id) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'id undefined' } })
  }

  const personExist = await prisma.person.findUnique({
    where: {
      id: Number(person.id),
    },
  })

  if (!personExist) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'person not exist' } })
  }

  const deletePerson = await prisma.person.delete({
    where: {
      id: Number(person.id),
    },
  })

  return res.status(200).json({ status: 'ok', data: deletePerson })
}

export default withJsonEnforcer(_delete)
