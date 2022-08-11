import handler from 'pages/api/mints'
import { createMocks, RequestMethod } from 'node-mocks-http'
import randomstring from 'randomstring'
import * as mintsService from 'backend/services/mints'

const validRequestBody = {
  minterEmail: 'abc@def.com' as any,
  minterWallet: 'abcd',
  passcode: '',
  message: 'test message' as any,
  ethDonated: '0.000123' as any,
  messageTokenId: 123,
}

const mintData = {
  ...validRequestBody,
  shortcode: '123as',
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
}

jest.mock('backend/services/mints', () => {
  const originalModule = jest.requireActual('backend/services/mints')
  return {
    __esModule: true,
    ...originalModule,
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
  }
})

randomstring.generate = jest.fn().mockResolvedValue('123as')

describe('api/mints', () => {
  let httpMockedData = {
    method: 'POST' as RequestMethod,
    body: validRequestBody,
  }
  beforeEach(() => {
    httpMockedData.body = validRequestBody
  })

  describe('POST', () => {
    it('successfully calls mints.create', async () => {
      const { req, res } = createMocks(httpMockedData)

      const createMintFn = jest
        .spyOn(mintsService, 'create')
        .mockResolvedValue(mintData)

      await handler(req, res)
      expect(createMintFn).toHaveBeenCalled()
    })

    it('successfully returns mint data', async () => {
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)
      expect(res.statusCode).toBe(200)
      expect(res._getData()).toEqual(JSON.stringify(mintData))
    })
  })
})
