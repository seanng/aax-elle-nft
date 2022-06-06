import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// const imagesData: Prisma.EncryptedImageCreateInput[] = [
//   {
//     url: 'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
//   },
//   {
//     url: 'https://webapp.io/blog/content/images/size/w2000/2019/11/postgres.png',
//   },
//   {
//     url: 'https://images.ctfassets.net/po4qc9xpmpuh/3LKPgAL1A9JEZuoxehHw3n/ae77470349d852a5e5d8240e5aa21045/fauna-twitter-card.png',
//   },
//   {
//     url: 'https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1zyyyetufa3bwkswvxr5.png',
//   },
// ]

async function dropCollections() {
  // await prisma.encryptedImage.deleteMany()
}

async function main() {
  console.log(`Dropping Collections ...`)
  await dropCollections()
  console.log(`Start seeding ...`)

  // for (const imageData of imagesData) {
  //   const image = await prisma.encryptedImage.create({
  //     data: {
  //       ...imageData,
  //     },
  //   })

  //   console.log(`Created image with id: ${image.id}`)
  // }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
