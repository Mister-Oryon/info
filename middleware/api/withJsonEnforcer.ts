import { NextApiRequest, NextApiResponse } from 'next'

const withJsonEnforcer = (
  handler: Function,
  shouldBbodyEmpty: boolean = false
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Check content type and check if it's an object
    if (
      req.headers['content-type'] === 'application/json' ||
      shouldBbodyEmpty == false ||
      (typeof req.body === 'object' &&
        !Array.isArray(req.body) &&
        req.body !== undefined)
    )
      return handler(req, res)

    return res.status(400).send('Bad Request')
  }
}

export default withJsonEnforcer
