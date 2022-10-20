import { HERO_CANVAS_WIDTH, HERO_CANVAS_HEIGHT } from 'shared/constants'

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function getWidthHeightPercentages(
  w = 0,
  h = 0,
  cvWidth = HERO_CANVAS_WIDTH,
  cvHeight = HERO_CANVAS_HEIGHT
) {
  return {
    height: `${(h / cvHeight) * 100}%`,
    width: `${(w / cvWidth) * 100}%`,
  }
}

export const uploadOneFile = async (
  folder: string,
  key: string,
  file: File | null
) => {
  if (!file) throw new Error('No File in uploadOneFile')
  // Get presigned post fields
  const res = await fetch(
    `/api/upload-encrypted-images-url?file=${folder}/${key}`
  )
  const { url, fields } = await res.json()
  const formData = new FormData()

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string)
  })

  // Upload to S3.
  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  if (!upload.ok) {
    console.error(`Upload failed for ${folder}/${key}`)
  }
}

export const downloadFile = (file) => {
  const link = document.createElement('a')
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const shuffle = (list: string[]) => {
  const keys = Object.keys(list) as unknown[] as number[]
  const result: string[] = []
  for (let k = 0, n = keys.length; k < list.length && n > 0; k += 1) {
    // eslint-disable-next-line no-bitwise
    const i = (Math.random() * n) | 0
    const key = keys[i]
    result.push(list[key])
    n -= 1
    const tmp = keys[n]
    keys[n] = key
    keys[i] = tmp
  }
  return result
}
