import { NextApiRequest, NextApiResponse } from 'next'
import { Admin, PrismaClient } from '@prisma/client'
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: string
  error?: {
    message: string
  }
}

async function login(req: NextApiRequest, res: NextApiResponse<Data>) {
  const admin: Admin = req.body

  if (!admin.email) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'email undefined' } })
  } else if (!admin.password) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'password undefined' } })
  }

  const nweAdmin = await prisma.admin.findUnique({
    where: {
      email: admin.email,
    },
  })

  if (!nweAdmin) {
    return res
      .status(200)
      .json({ status: 'error', error: { message: 'user not found' } })
  }

  let isPasswordCorrect = await bcrypt.compare(
    admin.password,
    nweAdmin.password
  )

  if (!isPasswordCorrect) {
    res
      .status(200)
      .json({ status: 'error', error: { message: 'password incorrect' } })
  }

  const token = jwt.sign({ userId: nweAdmin.id }, process.env.JWT_SECRET!, {
    algorithm: 'HS512',
  })

  res.status(200).json({ status: 'ok', data: token })
}

export default withJsonEnforcer(login)
