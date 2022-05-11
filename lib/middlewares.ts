import { validationResult } from 'express-validator'
import type { NextApiRequest } from 'next'

export const validate = (validations) => async (req: NextApiRequest) => {
  await Promise.all(validations.map((validation) => validation.run(req)))
  return validationResult(req)
}
