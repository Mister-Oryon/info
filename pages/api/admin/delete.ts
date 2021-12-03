// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withJsonEnforcer from '@middlewareAPI/withJsonEnforcer'
import { Admin, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface Data {
  status: string
  data?: Admin
  error?: {
    message: string
  }
}

async function _delete(req: NextApiRequest, res: NextApiResponse<Data>) {
  const admin: Admin = req.body

  if (!admin.email) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'firstName undefined' } })
  }

  const adminExist = await prisma.admin.findUnique({
    where: {
      email: admin.email,
    },
  })

  if (!adminExist) {
    return res
      .status(400)
      .json({ status: 'error', error: { message: 'admin not exist' } })
  }

  const deleteAdmin = await prisma.admin.delete({
    where: {
      email: admin.email,
    },
  })

  return res.status(200).json({ status: 'ok', data: deleteAdmin })
}

export default withJsonEnforcer(_delete)
