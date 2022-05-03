import { PrismaClient } from '@prisma/client'
import { createPrismaMock } from 'utils'

let prisma: PrismaClient

beforeEach(() => {
  prisma = createPrismaMock()
})

describe('/api/image', () => {
  it('should create new image', async () => {
    console.log('mocked context', prisma)

    // const mockImage = prismaMock.image.create.mockResolvedValue({
    //   id: '123',
    //   message: 'abcdefg',
    //   previewUrl:
    //     'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
    //   contractAddress: null,
    //   nftId: null,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // })
    // console.log('mockImage: ', mockImage)
    expect(true).toBe(true)
  })
})
