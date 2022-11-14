export const EMAIL_REGEX =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export const HERO_CANVAS_WIDTH = 1394
export const HERO_CANVAS_HEIGHT = 1030
export const INTRO_CANVAS_WIDTH = 1920
export const INTRO_CANVAS_HEIGHT = 1080

// sale phases
export const NOT_STARTED = 'not started'
export const PRIVATE_SALE = 'private sale'
export const PUBLIC_SALE = 'public sale'
export const REACHED_MESSAGE_LIMIT = 'reached message limit'
export const FINISHED = 'finished'

// error types
export const NO_WHITELIST_TOKEN = 'no whitelist token'
export const INCONSISTENT_CONTRACT_STATUS = 'INCONSISTENT_CONTRACT_STATUS'
export const INSUFFICIENT_WALLET_BALANCE = 'INSUFFICIENT_WALLET_BALANCE'
export const NO_ADDRESS_FOUND = 'no address found'

// s3 folders
export const BEFORE = 'before'
export const AFTER = 'after'
export const NEVER = 'never'
export const PUBLIC = 'public'

// devices
export const ANDROID = 'android'
export const IOS = 'ios'
export const DESKTOP = 'desktop'

// browsers
export const CHROME = 'chrome'
export const SAFARI = 'safari'
export const METAMASK_MOBILE = 'metamask mobile'
export const OTHER_BROWSER = 'other browser'

// networks
export const HOMESTEAD = 'homestead'
export const LOCALHOST = 'localhost'
export const GOERLI = 'goerli'

// airdrop recipient
export const PARTICIPANT = 'participant'
export const WINNER = 'winner'
export const KOL = 'key opinion leader'

// airtable
export const CONTRACT_NAME = 'Elleverse'
export const AIRTABLE_BASE_ID = 'appEJkckJzqTTk6II'
export const WALLET_FIELD = 'Wallet Address'
export const EMAIL_FIELD = 'Email'
export const NAME_FIELD = 'Name'
export const KOL_NAME_FIELD = 'KOL Name'
export const NFT_MESSAGE_FIELD = 'NFT Message'
export const AUTONUMBER_FIELD = 'Autonumber'
export const FRAME_PHRASE_FIELD = 'Frame Phrase (English)'
export const FRAME_SENDER_FIELD = 'Frame Sender (English)'
export const FRAME_RECEIVER_FIELD = 'Frame Receiver (English)'
export const BG_COLOR_FIELD = 'BG Color'
export const FRAME_COLOR_FIELD = 'Frame Color'
export const SIGNATURE_FIELD = 'Signature File'
export const ELLEMOJI_FIELD = 'Ellemoji ID'
export const WLT_NAME_FIELD = 'WLT Name'

// lucky draw
export const FETCHING = 'LOADING'
export const NOT_CONNECTED = 'NOT_CONNECTED'
export const READY = 'READY'
