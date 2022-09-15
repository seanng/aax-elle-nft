import crypto from 'crypto-js'

export const encrypt = (msg) => {
  const wordArray = crypto.enc.Utf8.parse(msg)
  return crypto.enc.Base64.stringify(wordArray)
}

export const decrypt = (hash) => {
  const parsedWordArray = crypto.enc.Base64.parse(hash)
  return parsedWordArray.toString(crypto.enc.Utf8)
}
