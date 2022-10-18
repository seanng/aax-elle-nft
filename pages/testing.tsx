import type { NextPage } from 'next'
import { getNFTSettings } from 'utils/nft'
import CompsNFTMain from 'components/NFT/Main'
import KolIcon07 from 'components/NFT/shared/kol-icons/07'

const data = getNFTSettings({
  isKol: true,
  signature: 'https://i.imgur.com/Qpji4ZS.png',
  gridIconTemplate: KolIcon07,
  aroundText:
    'AAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCFDDDDDDDDDDDDDDDDDDEE',
  neverOpenedAroundText: 'abcdef',
  message:
    '狐狸：「這是我的一個秘密，再簡單不過的秘密，一個人只有用心去看，才能看到真實。事情的真相只用眼睛是看不見的。」hello hello hell',
})

const TestPage: NextPage = () => {
  // ? Enable below to test getAssets function
  // useEffect(() => {
  //   const test = async () => {
  //     await getAssets({
  //       aroundText:
  //         'AAAAAAAAAA BBBBBBBBBB CCCCCCCCC DDDDDDDDD gpqy EEEEEEEEEE FFFFFFFFFF GGGGGGGGGG HHHHHHHHHH',
  //       message:
  //         '在旅途中，\n小王子思考愛的真諦明白馴養的意義。\n小王子思考愛的真諦明白馴養的意義。\nI love you.\n我愛你。',
  //     })
  //   }

  //   test()
  // }, [])

  const downloadFile = (file) => {
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <CompsNFTMain
      data={data}
      assetsCB={(assets) => {
        console.log(assets)
        // ? Enable below to download a file (remember to change the assets.xxx)

        // const link = document.createElement('a')
        // const url = URL.createObjectURL(assets.afterOpenHtml)

        // link.href = url
        // link.download = assets.afterOpenHtml.name
        // document.body.appendChild(link)
        // link.click()

        // document.body.removeChild(link)
        // window.URL.revokeObjectURL(url)
      }}
    />
  )
}

export default TestPage
