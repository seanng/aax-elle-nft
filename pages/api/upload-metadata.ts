import aws from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import { S3_BASE_URL } from 'shared/constants'

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
  const folderName = 'metadata'
  const accessParams = await getCrossAccountCredentials()
  const s3 = new aws.S3(accessParams)

  if (req.method === 'GET') {
    const filename = new Date().getTime()
    // TODO: change metadata description & image.
    const metadata = {
      name: 'Encrypted Message',
      description: '',
      image: 'https://static1.bigstockphoto.com/4/0/5/large1500/504426.jpg',
    }
    const key = `${folderName}/${filename}.json`
    return new Promise((resolve, reject) =>
      s3.upload(
        {
          Bucket: process.env.S3_BUCKET || 'elle-nft-dev',
          Key: key,
          ContentType: 'application/json',
          ContentEncoding: 'base64',
          Body: Buffer.from(JSON.stringify(metadata)),
        },
        function (err, data) {
          if (err) {
            console.log(err)
            console.log('Error uploading data: ', data)
            reject(res.status(400).send('Error uploading data to S3.'))
          }
          resolve(
            res.status(200).json({
              url: `${S3_BASE_URL}/${key}`,
            })
          )
        }
      )
    )
  }

  if (req.method === 'DELETE') {
    const filename = req.query.filename
    return new Promise((resolve, reject) =>
      s3.deleteObject(
        {
          Bucket: process.env.S3_BUCKET || 'elle-nft-dev',
          Key: `${folderName}/${filename}`,
        },
        function (err, data) {
          if (err) {
            console.log(err)
            console.log('Error uploading data: ', data)
            reject(res.status(400).send('Error uploading data to S3.'))
          }
          resolve(res.status(200).send('Delete success'))
        }
      )
    )
  }
}
