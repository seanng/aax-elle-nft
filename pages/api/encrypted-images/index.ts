import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {
  createEncryptedImages,
  getRandomEncryptedImage,
} from 'backend/services/encrypted-images'
import { validate } from 'lib/middlewares'
import { check } from 'express-validator'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    urls: string[]
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  const errors = await validate([check('urls').exists().isArray()])(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  const { urls } = req.body
  const images = await createEncryptedImages(urls.map((url) => ({ url })))
  res.json(images)
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const image = await getRandomEncryptedImage()
  res.json({ data: image })
  return
}

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..
  if (req.method === 'GET') return getHandler(req, res)
  if (req.method === 'POST') return postHandler(req, res)
}

export default handler
