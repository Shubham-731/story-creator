import { CheckCircleIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"

const TextInput = ({
  contentHandler,
}: {
  contentHandler: (content: string) => void
}) => {
  const [textContent, setTextContent] = useState("Sample text")

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Text content..."
        className="w-full px-2 py-1 text-sm rounded-md"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />
      <CheckCircleIcon
        className="w-7 h-7 cursor-pointer"
        onClick={() => contentHandler(textContent)}
      />
    </div>
  )
}

export default TextInput
