import aws from 'aws-sdk'

const myCredentials = {
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
  region: process.env.AMAZON_REGION,
  signatureVersion: 'v4',
}

export const makeElleDevS3 = async (): Promise<aws.S3> => {
  return new aws.S3(myCredentials)
}
