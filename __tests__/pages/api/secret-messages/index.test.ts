import handler from 'pages/api/secret-messages'
import { createMocks, RequestMethod } from 'node-mocks-http'
import * as secretMessagesService from 'backend/services/secret-messages'

const validRequestBody = {
  senderEmail: 'abc@def.com' as any,
  isPrivateOnly: true,
  password: '',
  senderWallet: 'abcd',
  message: 'test message' as any,
  ethDonated: '0.000123' as any,
  nftTokenId: 123,
  tokenURI: 'asdfasdfasfd',
  encryptedImageId: 'abcdef' as any,
}

const secretMessageData = {
  ...validRequestBody,
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('api/secret-messages', () => {
  let httpMockedData = {
    method: 'POST' as RequestMethod,
    body: validRequestBody,
  }
  beforeEach(() => {
    httpMockedData.body = validRequestBody
  })

  describe('POST', () => {
    it('successfully calls secretMessages.create', async () => {
      const { req, res } = createMocks(httpMockedData)

      const createSecretMessageFn = jest
        .spyOn(secretMessagesService, 'create')
        .mockResolvedValue(secretMessageData)

      await handler(req, res)
      expect(createSecretMessageFn).toHaveBeenCalled()
    })

    it('successfully returns secretMessage data', async () => {
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)
      expect(res.statusCode).toBe(200)
      expect(res._getData()).toEqual(JSON.stringify(secretMessageData))
    })
  })
})
