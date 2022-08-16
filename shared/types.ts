import { Mint } from '@prisma/client'

export enum DisplayMode {
  initial,
  exists,
  success,
  error,
}

export interface Files {
  unopenedImage: File | null
  unopenedHtml: File | null
  openedImage: File | null
  openedHtml: File | null
  neverOpenedImage: File | null
  neverOpenedHtml: File | null
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
