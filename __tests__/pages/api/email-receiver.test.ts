import { createMocks } from 'node-mocks-http'
import handler from 'pages/api/email-receiver'

const body = { email: 'a@a.com' }

describe('api/email-receiver', () => {
  describe('POST', () => {
    it('returns 400 if no email is provided in request body', async () => {
      const { req, res } = createMocks({ method: 'POST' })
      await handler(req, res)
      expect(res.statusCode).toBe(400)
    })
    it('returns 200 if an email is provided in request body', async () => {
      const { req, res } = createMocks({ method: 'POST', body })
      await handler(req, res)
      expect(res.statusCode).toBe(200)
    })
  })
})
