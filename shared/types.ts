import { FC } from 'react'
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
  afterOpenImage: File | null
  afterOpenHtml: File | null
  neverOpenedImage: File | null
  neverOpenedHtml: File | null
}

export interface MintForm {
  email: string
  message: string
  passcode: string
  minterName: string
  receiverName: string
  mintedAt: Date
  donationInput: number
  donationInEth: number
}

export type MintResponseData = Partial<Mint> | undefined

export interface NFTParametersBasic {
  aroundText: string
  message: string
  kolKey?: string
  Comps?: any
}

export interface NFTParameters {
  aroundText: string
  message: string
  backgroundStyle: string
  gridIconStyle1: string
  gridIconStyle2: string
  gridIconTemplate1?: FC
  gridIconTemplate2?: FC
  aroundTextStyle: string
  messageColor: string
  opacity?: string
  signature?: string
}
