import { NextApiHandler } from 'next'
import { create } from 'services/donation'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { body: b } = req
    await create({
      email: b.email,
      message: b.message,
      nftId: b.nftId,
      donationAmount: b.donationAmount,
      contractAddress: b.contractAddress,
      imageId: b.imageId,
    })
  }
}

export default handler
