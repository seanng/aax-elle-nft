import { prismaMock } from 'utils'
// Order of imports is important
import { getRandomEncryptedImage } from 'backend/services/encrypted-images'

describe('services/image', () => {
  describe('getRandomEncryptedImage', () => {
    it('returns an image', async () => {
      const imageData = {
        id: '123',
        url: 'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      prismaMock.encryptedImage.findFirst.mockResolvedValue(imageData)
      prismaMock.encryptedImage.count.mockResolvedValue(1)
      const randomImage = await getRandomEncryptedImage()
      expect(randomImage).toEqual(imageData)
    })
  })
})
