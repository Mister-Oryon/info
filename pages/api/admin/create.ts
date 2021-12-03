// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Admin, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Admin
  error?: {
    message: string
  }
}

async function create(req: NextApiRequest, res: NextApiResponse<Data>) {
  const admin: Admin = req.body

  if (!admin.email) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'firstName undefined' } })
  } else if (!admin.password) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'firstName undefined' } })
  }

  const adminExist = await prisma.admin.findFirst({
    where: {
      email: req.body.email,
    },
  })

  if (adminExist) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'admin exist' } })
  }

  const nweAdmin = await prisma.admin.create({
    data: {
      email: admin.email,
      password: await bcrypt.hash(admin.password, 10),
    },
  })

  return res.status(200).json({ status: 'ok', data: nweAdmin })
}

export default withJsonEnforcer(create)
