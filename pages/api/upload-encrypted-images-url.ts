import { NextApiRequest, NextApiResponse } from 'next'
import { makeElleDevS3 } from 'lib/aws'
import { s3Bucket } from 'utils/config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3 = await makeElleDevS3()

  const isHtml = req.query.file.slice(-5) === '.html'

  const post = await s3.createPresignedPost({
    Bucket: s3Bucket,
    Expires: 60, // seconds
    Fields: {
      key: req.query.file,
      'Content-Type': isHtml ? 'text/html' : 'image/png',
    },
    Conditions: [['content-length-range', 0, 1048576]], // up to 1 MB]
  })
  res.status(200).json(post)
}
