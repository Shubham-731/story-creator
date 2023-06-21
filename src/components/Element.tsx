import React from "react"
import { TrashIcon } from "@heroicons/react/24/solid"
import TextInput from "./TextInput"
import ColorPicker from "./ColorPicker"

const Element = ({
  id,
  removeElementHandler,
  setTextContent,
  setTextColor,
  setBgColor,
}: {
  id: string
  removeElementHandler: () => void
  setTextContent: (content: string) => void
  setTextColor: (color: string) => void
  setBgColor: (color: string) => void
}) => {
  return (
    <div className="mb-3 px-2 w-full border-b border-solid border-slate-400 pb-2 space-y-2">
      <div className="flex items-center justify-between">
        <p>Element ID: {id}</p>
        <TrashIcon
          className="h-5 w-5 cursor-pointer"
          onClick={removeElementHandler}
        />
      </div>

      <TextInput contentHandler={setTextContent} />

      <ColorPicker
        name="text color"
        initialColor="#ffffff"
        handleSave={setTextColor}
      />
      <ColorPicker
        name="background color"
        initialColor="#000000"
        handleSave={setBgColor}
      />
    </div>
  )
}

export default Element
