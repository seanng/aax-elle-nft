import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { s3BaseUrl } from 'utils/config'

// TODO: Change me.
const PUBLIC_SALE_FIRST_TOKEN_ID = 3113

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  let { id: fileName } = req.query as { id: string }
  const isIdEven = Number(fileName) % 2 === 0
  const isWhitelistPhase = Number(fileName) < PUBLIC_SALE_FIRST_TOKEN_ID

  const prizeTokenName = isWhitelistPhase ? 'Whitelist Token' : 'Prize Token'

  if (!isIdEven) {
    fileName = isWhitelistPhase ? 'whitelist' : 'prize'
  }

  res.json({
    name: isIdEven ? 'Message Token' : prizeTokenName,
    image: `${s3BaseUrl}/public/${fileName}.png`,
    // image: `${s3BaseUrl}/public/${fileName}${isIdEven ? '.png' : '.svg'}`,
    ...(isIdEven && { animation_url: `${s3BaseUrl}/public/${fileName}.html` }),
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') return getHandler(req, res)
}

export default handler
