import { NextApiHandler } from 'next'
import { uploadNewImages, getRandomImage } from 'services/image'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'GET') {
    const image = await getRandomImage()
    res.json({ data: image })
    return
  }

  if (req.method === 'POST') {
    const { images } = req.body
    await uploadNewImages(images)
  }
}

export default handler
