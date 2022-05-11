import handler from 'pages/api/donations'
import { createMocks, RequestMethod } from 'node-mocks-http'
import * as donationsService from 'backend/services/donations'

const validRequestBody = {
  email: 'abc@def.com' as any,
  message: 'test message' as any,
  donationAmount: '100012312313333' as any,
  contractAddress: 'abcdefg' as any,
  encryptedImageId: 'abcdef' as any,
}

const donationData = {
  ...validRequestBody,
  id: '123',
  nftId: 'abc',
  tokenURI: 'asdfasdfasfd',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('api/donations', () => {
  let httpMockedData = {
    method: 'POST' as RequestMethod,
    body: validRequestBody,
  }
  beforeEach(() => {
    httpMockedData.body = validRequestBody
  })

  describe('POST', () => {
    it('successfully calls donations.create', async () => {
      const { req, res } = createMocks(httpMockedData)

      const createDonationFn = jest
        .spyOn(donationsService, 'create')
        .mockResolvedValue(donationData)

      await handler(req, res)
      expect(createDonationFn).toHaveBeenCalled()
    })

    it('successfully returns donation data', async () => {
      const { req, res } = createMocks(httpMockedData)

      await handler(req, res)
      expect(res.statusCode).toBe(200)
      expect(res._getData()).toEqual(JSON.stringify(donationData))
    })

    it('sends 400 and does not call create donation if encryptedImageId is missing', async () => {
      delete httpMockedData.body.encryptedImageId
      const { req, res } = createMocks(httpMockedData)
      const createDonationFn = jest
        .spyOn(donationsService, 'create')
        .mockResolvedValue(donationData)

      await handler(req, res)

      expect(createDonationFn).not.toHaveBeenCalled()
      expect(res.statusCode).toBe(400)
    })
  })
})
