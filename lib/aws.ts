import aws from 'aws-sdk'

const sts = new aws.STS({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
  region: process.env.AMAZON_REGION,
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

export const makeS3 = async (): Promise<aws.S3> => {
  const tempCredentials = await getCrossAccountCredentials()
  return new aws.S3(tempCredentials)
}
