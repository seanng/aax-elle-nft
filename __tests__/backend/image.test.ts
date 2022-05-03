import { createPrismaMock, PrismaMock } from 'utils'
import { getRandomUnclaimedImage } from 'backend/image'

let prisma: PrismaMock

beforeEach(() => {
  prisma = createPrismaMock()
})

describe('backend/image', () => {
  describe('getRandomUnclaimedImage', () => {
    it('returns an image', async () => {
      const imageData = {
        id: '123',
        message: 'abcdefg',
        previewUrl:
          'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
        contractAddress: null,
        nftId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      prisma.image.findFirst.mockResolvedValue(imageData)
      expect(await getRandomUnclaimedImage(prisma)).toEqual(imageData)
    })
  })
})
