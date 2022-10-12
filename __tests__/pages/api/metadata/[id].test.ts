import handler from 'pages/api/metadata/[id]'
import { createMocks, RequestMethod } from 'node-mocks-http'
import { PRIVATE_SALE, PUBLIC_SALE } from 'shared/constants'
import * as config from 'utils/config'

describe('api/metadata/[id]', () => {
  let httpMockedData = {
    method: 'GET' as RequestMethod,
    query: { id: '1' },
  }

  describe('GET', () => {
    it('successfully returns a MessageToken JSON if ID is even number', async () => {
      const ODD_NUMBER = '310'
      httpMockedData.query.id = ODD_NUMBER
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: 'Message Token',
        image: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/${ODD_NUMBER}.png`,
        animation_url: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/${ODD_NUMBER}.html`,
      })
    })

    it('successfully returns a Whitelist Token JSON if ID is odd number during private sale', async () => {
      // @ts-ignore
      config.salePhase = PRIVATE_SALE

      const ODD_NUMBER = '13'
      httpMockedData.query.id = ODD_NUMBER
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: 'Whitelist Token',
        image: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/whitelist.svg`,
      })
    })

    it('successfully returns a Prize Token JSON if ID is odd number during public sale', async () => {
      // @ts-ignore
      config.salePhase = PUBLIC_SALE

      const ODD_NUMBER = '13'
      httpMockedData.query.id = ODD_NUMBER
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: 'Prize Token',
        image: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/prize.svg`,
      })
    })
  })
})
