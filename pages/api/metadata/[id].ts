import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NOT_STARTED, PRIVATE_SALE } from 'shared/constants'
import { salePhase, s3BaseUrl } from 'utils/config'

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { id: fileName } = req.query as { id: string }
  const isIdEven = Number(fileName) % 2 === 0
  const isWhitelistPhase = [NOT_STARTED, PRIVATE_SALE].includes(salePhase)

  // TODO: Update logic if WLTs do not become Prize Tokens
  const prizeTokenName = isWhitelistPhase ? 'Whitelist Token' : 'Prize Token'

  if (!isIdEven) {
    // TODO: Update logic if WLTs do not become Prize Tokens
    fileName = isWhitelistPhase ? 'whitelist' : 'prize'
  }

  res.json({
    name: isIdEven ? 'Message Token' : prizeTokenName,
    image: `${s3BaseUrl}/public/${fileName}.png`,
    animation_url: `${s3BaseUrl}/public/${fileName}.html`,
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
