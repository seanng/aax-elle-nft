import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { fromEmail } from 'utils/config'
import { sendMail } from 'lib/sendgrid'

interface PostHandlerRequest extends NextApiRequest {
  body: {
    email: string
    templateId: string
  }
}

async function postHandler(req: PostHandlerRequest, res: NextApiResponse) {
  if (!req.body.templateId || !req.body.email) {
    res.status(401).send('No email template id or email provided')
    return
  }

  const { templateId, email, ...rest } = req.body

  const data = await sendMail({
    templateId,
    from: fromEmail,
    to: email,
    dynamicTemplateData: rest,
  })

  res.json(data)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return postHandler(req, res)
}

export default handler
