import handler from 'pages/api/mints'
import { createMocks, RequestMethod } from 'node-mocks-http'
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
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
}

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
