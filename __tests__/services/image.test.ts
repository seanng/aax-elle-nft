import { prismaMock } from 'utils'
// Order of imports is important
import { getRandomImage } from 'services/image'

describe('services/image', () => {
  describe('getRandomImage', () => {
    it('returns an image', async () => {
      const imageData = {
        id: '123',
        previewUrl:
          'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      prismaMock.image.findFirst.mockResolvedValue(imageData)
      prismaMock.image.count.mockResolvedValue(1)
      const randomImage = await getRandomImage()
      expect(randomImage).toEqual(imageData)
    })
  })
})
