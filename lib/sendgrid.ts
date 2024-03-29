import sendgrid, { ClientResponse } from '@sendgrid/mail'
import { fromEmail } from 'utils/config'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '')

export default sendgrid

export async function sendMail({
  templateId,
  from = fromEmail,
  to,
  dynamicTemplateData,
}): Promise<[ClientResponse, {}]> {
  if (!templateId || !from) {
    throw new Error()
  }
  return sendgrid.send({
    templateId,
    from,
    to,
    dynamicTemplateData,
  })
}
