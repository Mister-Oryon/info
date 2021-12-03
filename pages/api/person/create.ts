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

async function create(req: NextApiRequest, res: NextApiResponse<Data>) {
  const person: Person = req.body

  if (!person.firstName) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'firstName undefined' } })
  }

  const personExist = await prisma.person.findFirst({
    where: {
      AND: { lastName: person.lastName, firstName: person.firstName },
    },
  })

  if (personExist) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'person exist' } })
  }

  const newUser = await prisma.person.create({
    data: {
      typePerson: person.typePerson,
      lastName: person.lastName,
      firstName: person.firstName,
      dateBirth: person.dateBirth,
      dateDeath: person.dateDeath,
      biography: person.biography,
    },
  })

  return res.status(200).json({ status: 'ok', data: newUser })
}

export default withJsonEnforcer(create)
