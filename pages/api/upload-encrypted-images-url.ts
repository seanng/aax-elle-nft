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

  const post = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET,
    Expires: 60, // seconds
    Fields: { key: req.query.file },
    Conditions: [['content-length-range', 0, 10485760]], // up to 10 MB]
  })
  res.status(200).json(post)
}
