"use client"

import { useMemo } from "react"
import { useDropzone } from "react-dropzone"

/* Styles */
const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#0f0f0f",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const focusedStyle = {
  borderColor: "#2196f3",
}

const acceptStyle = {
  borderColor: "#00e676",
}

const rejectStyle = {
  borderColor: "#ff1744",
}

const Dropzone = ({ setImage }: { setImage: (newImage: Image) => void }) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        const uploadedImage = acceptedFiles[0]

        setImage(
          Object.assign(uploadedImage, {
            imagePreview: URL.createObjectURL(uploadedImage),
          })
        )
      },
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div className="w-full relative">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-xs">Click to upload or Drag & Drop image</p>
      </div>
    </div>
  )
}

export default Dropzone
