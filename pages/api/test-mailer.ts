import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { MessageToken } from '@prisma/client'
import { fromEmail } from 'utils/config'
import { sendMail } from 'lib/sendgrid'

interface PostHandlerRequest extends NextApiRequest {
  body: MessageToken & {
    emailTemplateId?: string
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  if (!req.body.emailTemplateId || !req.body.minterEmail) {
    res.status(401).send('No email template id or minterEmail provided')
    return
  }

  const { emailTemplateId, minterEmail, ...rest } = req.body

  const data = await sendMail({
    templateId: emailTemplateId,
    from: fromEmail,
    to: minterEmail,
    dynamicTemplateData: rest,
  })

  res.json(data)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
}

export default handler
