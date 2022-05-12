import { createMocks } from 'node-mocks-http'
import { validate } from 'lib/middlewares'
import { check } from 'express-validator'

describe('lib/middlewares.ts', () => {
  describe('validate', () => {
    it('correctly validates existing fields', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { name: 'hello' },
      })
      const hasNameField = await validate([check('name').exists()])(req, res)
      expect(hasNameField).toBe(true)
      const hasIdField = await validate([check('id').exists()])(req, res)
      expect(hasIdField).toBe(false)
    })
    it('responds with 400 if field is invalid', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: { name: 'hello' },
      })
      await validate([check('id').exists()])(req, res)
      expect(res.statusCode).toBe(400)
    })
  })
})
