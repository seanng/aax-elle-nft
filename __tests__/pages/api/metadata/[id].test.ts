import handler from 'pages/api/metadata/[id]'
import { createMocks, RequestMethod } from 'node-mocks-http'
import { whitelistTokenNames } from 'data'

jest.mock('backend/services/prize-tokens', () => {
  const originalModule = jest.requireActual('backend/services/prize-tokens')
  return {
    __esModule: true,
    ...originalModule,
    findMany: jest.fn().mockResolvedValue([
      {
        id: 'abcd1234',
        tokenId: 13,
        isPrivateSale: true,
      },
    ]),
  }
})

describe('api/metadata/[id]', () => {
  let httpMockedData = {
    method: 'GET' as RequestMethod,
    query: { id: '1' },
  }

  describe('GET', () => {
    it('successfully returns a MessageToken JSON if ID is even number', async () => {
      const EVEN_NUMBER = '310'
      httpMockedData.query.id = EVEN_NUMBER
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: 'Love Message',
        image: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/${EVEN_NUMBER}.png`,
        animation_url: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/${EVEN_NUMBER}.html`,
      })
    })

    it('successfully returns a Whitelist Token JSON if ID is odd number during private sale', async () => {
      // @ts-ignore
      const id = '13'
      httpMockedData.query.id = id
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)

      expect(res._getJSONData()).toEqual({
        name: whitelistTokenNames[Math.floor(Number(id) / 2)],
        image: `https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com/public/whitelist.png`,
      })
    })
  })
})
