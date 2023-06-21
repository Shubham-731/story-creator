import Element from "./Element"
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"

const Sidebar = ({
  addElementHandler,
  removeElementHandler,
  setTextContent,
  setTextColor,
  setBgColor,
  downloadImageHandler,
  state,
}: {
  addElementHandler: () => void
  removeElementHandler: (elementId: string) => void
  setTextContent: (content: string, elementId: string) => void
  setTextColor: (elementId: string, color: string) => void
  setBgColor: (elementId: string, color: string) => void
  downloadImageHandler: () => void
  state: State
}) => {
  return (
    <aside className="bg-black/5 w-full max-w-xs h-full p-3 pr-0 border border-r border-gray-400 overflow-auto">
      <h1 className="font-semibold text-3xl mb-3 pb-2 border-b border-solid border-gray-400">
        Story Scrapper
      </h1>

      {state["elements"].map((element) => (
        <Element
          id={element.id}
          key={element.id}
          setTextContent={(content) => setTextContent(content, element.id)}
          removeElementHandler={() => removeElementHandler(element.id)}
          setTextColor={(color) => setTextColor(element.id, color)}
          setBgColor={(color) => setBgColor(element.id, color)}
        />
      ))}

      {state["imagePreview"] ? (
        <div className="flex items-center justify-between w-full pr-2">
          <button
            className="px-3 py-2 rounded-md hover:bg-slate-300 transition-all border border-solid border-slate-700"
            onClick={addElementHandler}
          >
            Add text
          </button>
          <button
            className="px-3 py-2 rounded-md hover:bg-slate-300 transition-all border border-solid border-slate-700"
            onClick={downloadImageHandler}
          >
            Download <ArrowDownTrayIcon className="w-5 h-5 inline" />
          </button>
        </div>
      ) : (
        <p>Upload an image to get started!</p>
      )}
    </aside>
  )
}

export default Sidebar
