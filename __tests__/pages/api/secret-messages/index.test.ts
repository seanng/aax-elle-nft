import handler from 'pages/api/secret-messages'
import { createMocks, RequestMethod } from 'node-mocks-http'
import * as secretMessagesService from 'backend/services/secret-messages'

const validRequestBody = {
  senderEmail: 'abc@def.com' as any,
  message: 'test message' as any,
  donationAmount: '100012312313333' as any,
  contractAddress: 'abcdefg' as any,
  encryptedImageId: 'abcdef' as any,
}

const secretMessageData = {
  ...validRequestBody,
  id: '123',
  nftId: 'abc',
  tokenURI: 'asdfasdfasfd',
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

    it('sends 400 and does not call create secret if encryptedImageId is missing', async () => {
      delete httpMockedData.body.encryptedImageId
      const { req, res } = createMocks(httpMockedData)
      const createSecretFn = jest
        .spyOn(secretMessagesService, 'create')
        .mockResolvedValue(secretMessageData)

      await handler(req, res)

      expect(createSecretFn).not.toHaveBeenCalled()
      expect(res.statusCode).toBe(400)
    })
  })
})
