// Should be run in node environment
const fs = require('fs')

const svgs = [
  'components/NFT/shared/background-icons/general__.svg',
  'components/NFT/shared/background-icons/general_!.svg',
  'components/NFT/shared/background-icons/general_apple_01.svg',
  'components/NFT/shared/background-icons/general_apple_02.svg',
  'components/NFT/shared/background-icons/general_beer.svg',
  'components/NFT/shared/background-icons/general_cat.svg',
  'components/NFT/shared/background-icons/general_cocktail.svg',
  'components/NFT/shared/background-icons/general_crown_01.svg',
  'components/NFT/shared/background-icons/general_crown_02.svg',
  'components/NFT/shared/background-icons/general_dialog.svg',
  'components/NFT/shared/background-icons/general_diamond.svg',
  'components/NFT/shared/background-icons/general_dog_01.svg',
  'components/NFT/shared/background-icons/general_dog_02.svg',
  'components/NFT/shared/background-icons/general_face_01.svg',
  'components/NFT/shared/background-icons/general_face_02.svg',
  'components/NFT/shared/background-icons/general_fire.svg',
  'components/NFT/shared/background-icons/general_gift.svg',
  'components/NFT/shared/background-icons/general_heart.svg',
  'components/NFT/shared/background-icons/general_key.svg',
  'components/NFT/shared/background-icons/general_like.svg',
  'components/NFT/shared/background-icons/general_lip.svg',
  'components/NFT/shared/background-icons/general_lock.svg',
  'components/NFT/shared/background-icons/general_paw.svg',
  'components/NFT/shared/background-icons/general_rose.svg',
  'components/NFT/shared/background-icons/general_spark.svg',
]

svgs.forEach((svg, i) => {
  fs.readFile(svg, 'utf8', function(readErr, readData) {
    if (readErr) return console.log(readErr, svg, i)

    const idNum = i + 1
    const idStr = `${idNum < 10 ? '0' : ''}${idNum}`
    const start = `
      const Icon${idStr} =({iconOutlineColor, iconFillColor }) => {
        return (
          <>
    `
    const end = `
          </>
        )
      }

      export default Icon${idStr}
    `
    const final = `${start}${readData}${end}`

    fs.writeFile(`components/NFT/shared/background-icons/${idStr}.tsx`, final, (writeError) => {
      if (writeError) return console.log(writeError, svg, i)
    })
  })
})
