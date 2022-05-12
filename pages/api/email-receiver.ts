import { check } from 'express-validator'
import { validate } from 'lib/middlewares'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    if (!(await validate([check('email').isEmail()])(req, res))) return
    // sg mail service
    return res.status(200).send('ok')
  }
}

export default handler
