import handler from 'pages/api/encrypted-images'
import { createMocks } from 'node-mocks-http'
import * as imageService from 'backend/services/encrypted-images'

const imageData = {
  id: '123',
  previewUrl:
    'https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2017-06/mongodb.png',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('api/encrypted-images', () => {
  describe('GET', () => {
    it('calls getRandomEncryptedImage', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      const spy = jest
        .spyOn(imageService, 'getRandomEncryptedImage')
        .mockResolvedValue(imageData)

      await handler(req, res)

      expect(spy).toHaveBeenCalled()
      expect(res._isJSON()).toBe(true)
    })
  })
})
