import type { ClientResponse } from '@sendgrid/mail'
import sendgrid from 'lib/sendgrid'
import { fromEmail } from 'utils/config'

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
