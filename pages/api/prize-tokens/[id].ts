import * as service from 'backend/services/prize-tokens'
import { sendMail } from 'lib/sendgrid'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { emailTemplateIds, luckyDrawable } from 'utils/config'

async function drawPrize(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }
  const { email } = req.body
  try {
    if (!luckyDrawable) {
      res.status(400).send('Not luckydrawable..')
      return
    }
    const data = await service.findUnique({ id })
    if (!data) {
      return res.status(404).send('Prize Not Found')
    }
    await service.update({ id }, { openedAt: new Date() })
    await sendMail({
      templateId: emailTemplateIds.PRIZE_WON,
      to: email,
      dynamicTemplateData: {
        prize_name: data.prizeName,
      },
    })
    res.status(200).send({ success: 'ok' })
  } catch (error) {
    console.log('error in drawPrize: ', error)
    res.status(500).send('Server error')
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') return drawPrize(req, res)
}

export default handler
