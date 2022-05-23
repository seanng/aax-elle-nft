import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRestrictAccess } from 'hooks'
import { SpinningOverlay } from 'components'
import { toast } from 'react-toastify'
import axios from 'lib/axios'

const Img = (props) => {
  const [dimensions, setDimensions] = useState(['100px', '100px'])
  const handleOnLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img
    setDimensions([offsetHeight, offsetWidth])
  }
  return (
    <img
      onLoad={handleOnLoad}
      height={dimensions[0]}
      width={dimensions[1]}
      {...props}
    />
  )
}

const UploadImagesPage: NextPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const canAccess = useRestrictAccess()

  const handleFilesChange = ({ target }) => {
    setFiles(Array.from(target.files))
  }

  const handleUploadClick = async () => {
    setIsUploading(true)
    const folderName = 'encrypted-images'
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const filename = encodeURIComponent(file.name)
      const res = await fetch(
        `/api/upload-encrypted-images-url?file=${folderName}/${filename}`
      )
      const { url, fields } = await res.json()
      const formData = new FormData()

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      try {
        const upload = await fetch(url, {
          method: 'POST',
          body: formData,
        })

        if (!upload.ok) {
          setIsUploading(false)
          toast.error(`Could not upload ${file.name}`)
          return
        }

        const cloudfrontUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_BASE_URL}/${folderName}/${filename}`
        await axios.post('/api/encrypted-images', { urls: [cloudfrontUrl] })

        setFiles((prev) => {
          const [, ...rest] = prev
          return rest
        })
        setUploadedFiles((prev) => prev.concat(file))
      } catch (error) {
        console.log('error fetching: ', error)
      }
    }
    // console.log('the urls: ', urls)
  }

  useEffect(() => {
    if (files.length === 0) {
      toast.success('Successfully uploaded all files!')
      setIsUploading(false)
    }
  }, [files])

  // if (isUploading) return

  return canAccess ? (
    <div className="flex-col p-4">
      <div>
        <input
          multiple={true}
          name="file"
          accept="image/*"
          type="file"
          onChange={handleFilesChange}
        />
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={handleUploadClick}
        >
          Upload
        </button>
      </div>
      <div className="grid grid-flow-col auto-cols-max pt-4">
        {files.map((file) => (
          <Img
            className="pr-5"
            key={file.name}
            src={URL.createObjectURL(file)}
          />
        ))}
      </div>
      <h1 className="pt-4">Successfully uploaded: </h1>
      <div className="grid grid-flow-col auto-cols-max pt-4">
        {uploadedFiles.map((file) => (
          <Img
            className="pr-5"
            key={file.name}
            src={URL.createObjectURL(file)}
          />
        ))}
      </div>
      <SpinningOverlay isLoading={isUploading} />
    </div>
  ) : (
    <div>Access Restricted</div>
  )
}

export default UploadImagesPage
