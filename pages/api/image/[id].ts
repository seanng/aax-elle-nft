import { NextApiHandler } from 'next'
import { updateImage } from 'services/image'

const handler: NextApiHandler = async (req, res) => {
  // checks re. methods, etc..

  if (req.method === 'PUT') {
    const imageId = req.query.id as string
    const image = await updateImage(imageId, req.body)
    res.json(image)
    return
  }
}

export default handler
