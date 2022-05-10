import { NextApiHandler } from 'next'
import { createImages, getRandomImage } from 'services/image'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'GET') {
    const image = await getRandomImage()
    res.json({ data: image })
    return
  }

  if (req.method === 'POST') {
    const { images } = req.body
    await createImages(images)
  }
}

export default handler
