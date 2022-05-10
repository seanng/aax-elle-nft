import type { NextPage } from 'next'
import { useState } from 'react'
import { useS3Upload } from 'next-s3-upload'

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
  const [urls, setUrls] = useState<String[]>([])

  const { uploadToS3 } = useS3Upload()

  const handleFilesChange = ({ target }) => {
    setFiles(Array.from(target.files))
  }

  const handleUploadClick = async () => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const { url } = await uploadToS3(file)
      setUrls((current) => [...current, url])
    }
  }

  return (
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
    </div>
  )
}

export default UploadImagesPage
