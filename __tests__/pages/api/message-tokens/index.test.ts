import handler from 'pages/api/message-tokens'
import { createMocks, RequestMethod } from 'node-mocks-http'
import randomstring from 'randomstring'
import * as service from 'backend/services/message-tokens'

jest.mock('lib/sendgrid')
jest.mock('lib/contract', () => {})
jest.mock('@sendgrid/mail')

const validRequestBody = {
  minterEmail: 'abc@def.com' as any,
  minterWallet: 'abcd',
  passcode: '',
  message: 'test message' as any,
  ethDonated: '0.000123' as any,
  tokenId: 123,
}

const mintData = {
  ...validRequestBody,
  slug: '123as',
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
}

jest.mock('backend/services/message-tokens', () => {
  const originalModule = jest.requireActual('backend/services/message-tokens')
  return {
    __esModule: true,
    ...originalModule,
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
  }
})

randomstring.generate = jest.fn().mockResolvedValue('123as')

describe('api/message-tokens', () => {
  let httpMockedData = {
    method: 'POST' as RequestMethod,
    body: validRequestBody,
  }
  beforeEach(() => {
    httpMockedData.body = validRequestBody
  })

  describe('POST', () => {
    it('successfully calls message-tokens.create', async () => {
      const { req, res } = createMocks(httpMockedData)

      const createMintFn = jest
        .spyOn(service, 'create')
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
