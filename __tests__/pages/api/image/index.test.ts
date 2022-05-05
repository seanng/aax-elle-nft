import handler from 'pages/api/image'
import { createMocks } from 'node-mocks-http'
import * as imageService from 'services/image'

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

describe('api/image handler', () => {
  it('calls getRandomUnclaimedImage', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    const spy = jest
      .spyOn(imageService, 'getRandomUnclaimedImage')
      .mockResolvedValue(imageData)

    await handler(req, res)

    expect(spy).toHaveBeenCalled()
    expect(res._isJSON()).toBe(true)
  })
})
