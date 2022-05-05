import { prismaMock } from 'utils'
// Order of imports is important
import { getRandomUnclaimedImage } from 'services/image'

describe('services/image', () => {
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
      prismaMock.image.findFirst.mockResolvedValue(imageData)
      prismaMock.image.count.mockResolvedValue(1)
      const randomImage = await getRandomUnclaimedImage()
      expect(randomImage).toEqual(imageData)
    })
  })
})
