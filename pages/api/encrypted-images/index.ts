import { NextApiHandler } from 'next'
import {
  createEncryptedImages,
  getRandomEncryptedImage,
} from 'backend/services/encrypted-images'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'GET') {
    const image = await getRandomEncryptedImage()
    res.json({ data: image })
    return
  }

  if (req.method === 'POST') {
    const { images } = req.body
    await createEncryptedImages(images)
  }
}

export default handler
