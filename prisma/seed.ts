import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const imagesData: Prisma.ImageCreateInput[] = [
  {
    previewUrl:
      'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
  },
  {
    previewUrl:
      'https://webapp.io/blog/content/images/size/w2000/2019/11/postgres.png',
  },
  {
    previewUrl:
      'https://images.ctfassets.net/po4qc9xpmpuh/3LKPgAL1A9JEZuoxehHw3n/ae77470349d852a5e5d8240e5aa21045/fauna-twitter-card.png',
  },
  {
    previewUrl:
      'https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1zyyyetufa3bwkswvxr5.png',
  },
]

async function dropCollections() {
  await prisma.image.deleteMany()
}

async function main() {
  console.log(`Dropping Collections ...`)
  await dropCollections()
  console.log(`Start seeding ...`)

  for (const imageData of imagesData) {
    const image = await prisma.image.create({
      data: {
        ...imageData,
      },
    })

    console.log(`Created image with id: ${image.id}`)
  }
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
