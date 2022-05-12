import { validationResult } from 'express-validator'
import type { NextApiRequest, NextApiResponse } from 'next'

export const validate =
  (validations) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    await Promise.all(validations.map((validation) => validation.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return false
    }
    return true
  }
