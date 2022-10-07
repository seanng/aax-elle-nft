import { FC } from 'react'
import { MessageToken } from '@prisma/client'

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
  donationInput: number
  donationInEth: number
}

export type MintResponseData = Partial<MessageToken> | undefined

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
  aroundTextColor: string
  messageColor: string
  opacity?: string
  signature?: string
}

export interface KolDropdownListItem {
  id: number
  name: string
  frameText: string
}
