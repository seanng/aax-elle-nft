import { useEffect, useState } from 'react'

export function usePreviewHtml(htmlFile) {
  const [preview, setPreview] = useState<string | ArrayBuffer>('') // eslint-disable-line

  useEffect(() => {
    if (htmlFile) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => setPreview(reader.result ?? ''),
        false
      )

      reader.readAsText(htmlFile)
    }
  }, [htmlFile])

  return preview
}
