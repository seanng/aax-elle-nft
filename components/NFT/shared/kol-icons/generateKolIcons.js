// Should be run in node environment
const fs = require('fs')

const svgs = [
  'components/NFT/shared/kol-icons/Group-1.svg',
  'components/NFT/shared/kol-icons/Group-2.svg',
  'components/NFT/shared/kol-icons/Group-3.svg',
  'components/NFT/shared/kol-icons/Group-4.svg',
  'components/NFT/shared/kol-icons/Group-5.svg',
  'components/NFT/shared/kol-icons/Group-6.svg',
  'components/NFT/shared/kol-icons/Group-7.svg',
  'components/NFT/shared/kol-icons/Group-8.svg',
  'components/NFT/shared/kol-icons/Group-9.svg',
  'components/NFT/shared/kol-icons/Group-10.svg',
  'components/NFT/shared/kol-icons/Group-11.svg',
  'components/NFT/shared/kol-icons/Group-12.svg',
  'components/NFT/shared/kol-icons/Group-13.svg',
  'components/NFT/shared/kol-icons/Group-14.svg',
  'components/NFT/shared/kol-icons/Group-15.svg',
  'components/NFT/shared/kol-icons/Group-16.svg',
  'components/NFT/shared/kol-icons/Group-17.svg',
  'components/NFT/shared/kol-icons/Group-18.svg',
  'components/NFT/shared/kol-icons/Group-19.svg',
  'components/NFT/shared/kol-icons/Group-20.svg',
  'components/NFT/shared/kol-icons/Group-21.svg',
  'components/NFT/shared/kol-icons/Group-22.svg',
  'components/NFT/shared/kol-icons/Group-23.svg',
  'components/NFT/shared/kol-icons/Group-24.svg',
  'components/NFT/shared/kol-icons/Group-25.svg',
  'components/NFT/shared/kol-icons/Group-26.svg',
  'components/NFT/shared/kol-icons/Group-27.svg',
  'components/NFT/shared/kol-icons/Group-28.svg',
  'components/NFT/shared/kol-icons/Group-29.svg',
  'components/NFT/shared/kol-icons/Group-30.svg',
  'components/NFT/shared/kol-icons/Group-31.svg',
  'components/NFT/shared/kol-icons/Group-32.svg',
  'components/NFT/shared/kol-icons/Group-33.svg',
  'components/NFT/shared/kol-icons/Group-34.svg',
  'components/NFT/shared/kol-icons/Group-35.svg',
  'components/NFT/shared/kol-icons/Group-36.svg',
  'components/NFT/shared/kol-icons/Group-37.svg',
  'components/NFT/shared/kol-icons/Group-38.svg',
  'components/NFT/shared/kol-icons/Group-39.svg',
  'components/NFT/shared/kol-icons/Group-40.svg',
  'components/NFT/shared/kol-icons/Group-41.svg',
  'components/NFT/shared/kol-icons/Group-42.svg',
  'components/NFT/shared/kol-icons/Group-43.svg',
  'components/NFT/shared/kol-icons/Group-44.svg',
  'components/NFT/shared/kol-icons/Group-45.svg',
  'components/NFT/shared/kol-icons/Group-46.svg',
  'components/NFT/shared/kol-icons/Group-47.svg',
  'components/NFT/shared/kol-icons/Group-48.svg',
  'components/NFT/shared/kol-icons/Group-49.svg',
  'components/NFT/shared/kol-icons/Group-50.svg',
  'components/NFT/shared/kol-icons/Group-51.svg',
  'components/NFT/shared/kol-icons/Group-52.svg',
  'components/NFT/shared/kol-icons/Group-53.svg',
  'components/NFT/shared/kol-icons/Group-54.svg',
  'components/NFT/shared/kol-icons/Group-55.svg',
  'components/NFT/shared/kol-icons/Group-56.svg',
  'components/NFT/shared/kol-icons/Group-57.svg',
  'components/NFT/shared/kol-icons/Group-58.svg',
  'components/NFT/shared/kol-icons/Group-59.svg',
  'components/NFT/shared/kol-icons/Group-60.svg',
  'components/NFT/shared/kol-icons/Group-61.svg',
  'components/NFT/shared/kol-icons/Group-62.svg',
  'components/NFT/shared/kol-icons/Group-63.svg',
  'components/NFT/shared/kol-icons/Group-64.svg',
  'components/NFT/shared/kol-icons/Group-65.svg',
  'components/NFT/shared/kol-icons/Group-66.svg',
  'components/NFT/shared/kol-icons/Group-67.svg',
  'components/NFT/shared/kol-icons/Group-68.svg',
  'components/NFT/shared/kol-icons/Group-69.svg',
  'components/NFT/shared/kol-icons/Group-70.svg',
  'components/NFT/shared/kol-icons/Group-71.svg',
  'components/NFT/shared/kol-icons/Group-72.svg',
  'components/NFT/shared/kol-icons/Group-73.svg',
  'components/NFT/shared/kol-icons/Group-74.svg',
  'components/NFT/shared/kol-icons/Group-75.svg',
  'components/NFT/shared/kol-icons/Group-76.svg',
  'components/NFT/shared/kol-icons/Group-77.svg',
  'components/NFT/shared/kol-icons/Group-78.svg',
  'components/NFT/shared/kol-icons/Group-79.svg',
  'components/NFT/shared/kol-icons/Group-80.svg',
  'components/NFT/shared/kol-icons/Group-81.svg',
  'components/NFT/shared/kol-icons/Group-82.svg',
  'components/NFT/shared/kol-icons/Group-83.svg',
  'components/NFT/shared/kol-icons/Group-84.svg',
  'components/NFT/shared/kol-icons/Group-85.svg',
  'components/NFT/shared/kol-icons/Group-86.svg',
  'components/NFT/shared/kol-icons/Group-87.svg',
  'components/NFT/shared/kol-icons/Group-88.svg',
  'components/NFT/shared/kol-icons/Group-89.svg',
  'components/NFT/shared/kol-icons/Group-90.svg',
  'components/NFT/shared/kol-icons/Group-91.svg',
  'components/NFT/shared/kol-icons/Group-92.svg',
  'components/NFT/shared/kol-icons/Group-93.svg',
  'components/NFT/shared/kol-icons/Group-94.svg',
  'components/NFT/shared/kol-icons/Group-95.svg',
  'components/NFT/shared/kol-icons/Group-96.svg',
  'components/NFT/shared/kol-icons/Group-97.svg',
  'components/NFT/shared/kol-icons/Group-98.svg',
  'components/NFT/shared/kol-icons/Group-99.svg',
  'components/NFT/shared/kol-icons/Group-100.svg',
  'components/NFT/shared/kol-icons/Group-101.svg',
  'components/NFT/shared/kol-icons/Group-102.svg',
  'components/NFT/shared/kol-icons/Group-103.svg',
  'components/NFT/shared/kol-icons/Group-104.svg',
  'components/NFT/shared/kol-icons/Group-105.svg',
  'components/NFT/shared/kol-icons/Group-106.svg',
  'components/NFT/shared/kol-icons/Group-107.svg',
  'components/NFT/shared/kol-icons/Group-108.svg',
  'components/NFT/shared/kol-icons/Group-109.svg',
  'components/NFT/shared/kol-icons/Group-110.svg',
  'components/NFT/shared/kol-icons/Group-111.svg',
  'components/NFT/shared/kol-icons/Group-112.svg',
  'components/NFT/shared/kol-icons/Group-113.svg',
]

svgs.forEach((svg, i) => {
  fs.readFile(svg, 'utf8', function(readErr, readData) {
    if (readErr) return console.log(readErr, svg, i)

    const idNum = i + 1
    const idStr = `${idNum < 10 ? '0' : ''}${idNum}`
    const start = `
      const Icon${idStr} = () => {
        return (
    `
    const end = `
        )
      }

      export default Icon${idStr}
    `
    const final = `${start}${readData}${end}`

    fs.writeFile(`components/NFT/shared/kol-icons/${idStr}.tsx`, final, (writeError) => {
      if (writeError) return console.log(writeError, svg, i)
    })
  })
})
