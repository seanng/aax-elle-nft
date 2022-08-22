import { Mint } from '@prisma/client'

export enum DisplayMode {
  initial,
  exists,
  success,
  error,
}

export interface Files {
  beforeOpenImage: File | null
  beforeOpenHtml: File | null
  beforeOpenPreview: string | null
  beforeOpenDataURL: string | null
  afterOpenImage: File | null
  afterOpenHtml: File | null
  afterOpenPreview: string | null
  afterOpenDataURL: string | null
  neverOpenedImage: File | null
  neverOpenedHtml: File | null
  neverOpenedPreview: string | null
  neverOpenedDataURL: string | null
}

export interface MintForm {
  email: string
  message: string
  passcode: string
  senderName: string
  receiverName: string
  mintedAt: Date
  donationInput: number
  donationInEth: number
}

export type MintResponseData = Partial<Mint> | undefined

export interface NFTParameters {
  message: string
  gridIconColor: string
  aroundTextColor: string
  aroundText: string
  background?: string
  messageColor?: string
  opacity?: string
}
