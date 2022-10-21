import * as service from 'backend/services/prize-tokens'
import { sendMail } from 'lib/sendgrid'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { emailTemplateIds } from 'utils/config'

async function drawPrize(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }
  try {
    const data = await service.findUnique({ id })
    if (!data) {
      return res.status(404).send('Prize Not Found')
    }
    await service.update({ id }, { openedAt: new Date() })

    if (data.minterEmail) {
      await sendMail({
        templateId: emailTemplateIds.PRIZE_WON,
        to: data.minterEmail,
        dynamicTemplateData: {
          prize_name: data.prizeName,
        },
      })
    }
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
