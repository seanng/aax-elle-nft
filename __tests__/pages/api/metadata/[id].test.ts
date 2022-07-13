import handler from 'pages/api/metadata/[id]'
import { createMocks, RequestMethod } from 'node-mocks-http'

describe('api/metadata/[id]', () => {
  let httpMockedData = {
    method: 'GET' as RequestMethod,
    query: { id: '1' },
  }

  describe('GET', () => {
    it('successfully returns a MessageToken JSON if ID is odd number', async () => {
      const ODD_NUMBER = '311'
      httpMockedData.query.id = ODD_NUMBER
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: 'Message Token',
        image: `https://s3blablabla.amazonaws.com/images/${ODD_NUMBER}.png`,
        animation_url: `https://s3blablabla.amazonaws.com/display/${ODD_NUMBER}.html`,
      })
    })

    it('successfully returns a Whitelist Token JSON if ID is even number', async () => {
      const EVEN_NUMBER = '14'
      httpMockedData.query.id = EVEN_NUMBER
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: 'Whitelist Token',
        image: `https://s3blablabla.amazonaws.com/images/${EVEN_NUMBER}.png`,
        animation_url: `https://s3blablabla.amazonaws.com/display/${EVEN_NUMBER}.html`,
      })
    })
  })
})
