import { NextApiRequest, NextApiResponse } from 'next'
import { makeS3 } from 'lib/aws'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3 = await makeS3()

  const isHtml = req.query.file.slice(-5) === '.html'

  const post = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET,
    Expires: 60, // seconds
    Fields: {
      key: req.query.file,
      'Content-Type': isHtml ? 'text/html' : 'image/png',
    },
    Conditions: [['content-length-range', 0, 1048576]], // up to 1 MB]
  })
  res.status(200).json(post)
}
