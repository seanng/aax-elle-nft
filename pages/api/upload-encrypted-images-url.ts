import aws from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'

const sts = new aws.STS({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
})

const getCrossAccountCredentials = async (): Promise<{
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
}> =>
  new Promise((resolve, reject) => {
    const timestamp = new Date().getTime()
    const params = {
      RoleArn:
        'arn:aws:iam::122170084761:role/assume-role-default-sean-ng-aax-com',
      RoleSessionName: `temp-sesh-${timestamp}`,
    }
    sts.assumeRole(params, (err, data) => {
      if (err) reject(err)
      else if (!data?.Credentials) console.log('No credentials data.', data)
      else {
        resolve({
          accessKeyId: data.Credentials.AccessKeyId,
          secretAccessKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.SessionToken,
        })
      }
    })
  })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessParams = await getCrossAccountCredentials()
  const s3 = new aws.S3(accessParams)

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
