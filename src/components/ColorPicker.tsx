import { DocumentCheckIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"
import { HexColorPicker } from "react-colorful"

const ColorPicker = ({
  name,
  initialColor,
  handleSave,
}: {
  name: string
  initialColor: string
  handleSave: (color: string) => void
}) => {
  const [color, setColor] = useState(initialColor)

  return (
    <div className="relative w-full flex items-center justify-between flex-wrap">
      <p className="capitalize">{name}</p>
      <button
        onClick={() => handleSave(color)}
        className="text-sm hover:bg-slate-200 transition-all border border-solid border-slate-400 rounded-md px-2 py-1"
      >
        <DocumentCheckIcon className="inline h-4 w-4" /> Apply
      </button>
      <HexColorPicker
        className="mx-auto my-1"
        color={color}
        onChange={setColor}
      />
    </div>
  )
}

export default ColorPicker
