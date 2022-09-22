export const EMAIL_REGEX =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export const HERO_CANVAS_WIDTH = 1394
export const HERO_CANVAS_HEIGHT = 1030
export const INTRO_CANVAS_WIDTH = 1920
export const INTRO_CANVAS_HEIGHT = 1080

export const CORRECT_NETWORK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'homestead' : 'rinkeby'

export const isTestingLocalhostNode = false // if false, we directly test rinkeby.

export const CORRECT_HEX_CHAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? '0x1'
    : isTestingLocalhostNode
    ? process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? '0x4'
      : '0x539'
    : '0x4'

// sale phases
export const NOT_STARTED = 'not started'
export const PUBLIC_SALE = 'public sale'
export const PRIVATE_SALE = 'private sale'
export const FINISHED = 'finished'

// error types
export const NO_WHITELIST_TOKEN = 'no whitelist token'
export const INCONSISTENT_CONTRACT_STATUS = 'INCONSISTENT_CONTRACT_STATUS'
export const INSUFFICIENT_WALLET_BALANCE = 'INSUFFICIENT_WALLET_BALANCE'
export const NO_ADDRESS_FOUND = 'no address found'

// s3 folders
export const S3_BUCKET = process.env.S3_BUCKET ?? 'elle-nft-dev'
export const BEFORE = 'before'
export const AFTER = 'after'
export const NEVER = 'never'
export const PUBLIC = 'public'

export const S3_BASE_URL =
  process.env.NEXT_PUBLIC_S3_BASE_URL ??
  'https://elle-nft-dev.s3.ap-southeast-1.amazonaws.com'

// devices
export const ANDROID = 'android'
export const IOS = 'ios'
export const DESKTOP = 'desktop'

// browsers
export const CHROME = 'chrome'
export const SAFARI = 'safari'
export const OTHER_BROWSER = 'other browser'
