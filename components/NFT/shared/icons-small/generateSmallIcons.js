// Should be run in node environment
const fs = require('fs')

const svgs = [
  'components/NFT/shared/icons-small/Group1.svg',
  'components/NFT/shared/icons-small/Group2.svg',
  'components/NFT/shared/icons-small/Group3.svg',
  'components/NFT/shared/icons-small/Group4.svg',
  'components/NFT/shared/icons-small/Group5.svg',
  'components/NFT/shared/icons-small/Group6.svg',
  'components/NFT/shared/icons-small/Group7.svg',
  'components/NFT/shared/icons-small/Group8.svg',
  'components/NFT/shared/icons-small/Group9.svg',
  'components/NFT/shared/icons-small/Group10.svg',
  'components/NFT/shared/icons-small/Group11.svg',
  'components/NFT/shared/icons-small/Group12.svg',
  'components/NFT/shared/icons-small/Group13.svg',
  'components/NFT/shared/icons-small/Group14.svg',
  'components/NFT/shared/icons-small/Group15.svg',
  'components/NFT/shared/icons-small/Group16.svg',
  'components/NFT/shared/icons-small/Group17.svg',
  'components/NFT/shared/icons-small/Group18.svg',
  'components/NFT/shared/icons-small/Group19.svg',
  'components/NFT/shared/icons-small/Group20.svg',
  'components/NFT/shared/icons-small/Group21.svg',
  'components/NFT/shared/icons-small/Group22.svg',
  'components/NFT/shared/icons-small/Group23.svg',
  'components/NFT/shared/icons-small/Group24.svg',
  'components/NFT/shared/icons-small/Group25.svg',
  'components/NFT/shared/icons-small/Group26.svg',
  'components/NFT/shared/icons-small/Group27.svg',
  'components/NFT/shared/icons-small/Group28.svg',
  'components/NFT/shared/icons-small/Group29.svg',
  'components/NFT/shared/icons-small/Group30.svg',
  'components/NFT/shared/icons-small/Group31.svg',
  'components/NFT/shared/icons-small/Group32.svg',
  'components/NFT/shared/icons-small/Group33.svg',
  'components/NFT/shared/icons-small/Group34.svg',
  'components/NFT/shared/icons-small/Group35.svg',
  'components/NFT/shared/icons-small/Group36.svg',
  'components/NFT/shared/icons-small/Group37.svg',
  'components/NFT/shared/icons-small/Group38.svg',
  'components/NFT/shared/icons-small/Group39.svg',
  'components/NFT/shared/icons-small/Group40.svg',
  'components/NFT/shared/icons-small/Group41.svg',
  'components/NFT/shared/icons-small/Group42.svg',
  'components/NFT/shared/icons-small/Group43.svg',
  'components/NFT/shared/icons-small/Group44.svg',
  'components/NFT/shared/icons-small/Group45.svg',
  'components/NFT/shared/icons-small/Group46.svg',
  'components/NFT/shared/icons-small/Group47.svg',
  'components/NFT/shared/icons-small/Group48.svg',
  'components/NFT/shared/icons-small/Group49.svg',
]

svgs.forEach((svg, i) => {
  fs.readFile(svg, 'utf8', function(readErr, readData) {
    if (readErr) return console.log(readErr, svg, i)

    const idNum = i + 1
    const idStr = `${idNum < 10 ? '0' : ''}${idNum}`
    const start = `
      const Icon${idStr} = (props) => {
        return (
    `
    const end = `
          )
      }

      export default Icon${idStr}
    `
    const final = `${start}${readData}${end}`

    fs.writeFile(`components/NFT/shared/icons-small/${idStr}.tsx`, final, (writeError) => {
      if (writeError) return console.log(writeError, svg, i)
    })
  })
})
