"use client"

import Dropzone from "@/components/Dropzone"
import { useReducer, useState, useRef } from "react"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { nanoid } from "nanoid"
import { updateElementProperty, updateElementStyleProperty } from "@/utility"
import TextElement from "@/components/TextElement"
import html2canvas from "html2canvas"

const initialState: State = {
  imagePreview: "",
  elements: [],
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        ...state,
        imagePreview: action.imagePreview,
      }

    case "ADD_ELEMENT":
      const elements = state["elements"]
      elements.push({
        id: action.elementId,
        textContent: "Sample text",
        style: {
          color: "#ffffff",
          backgroundColor: "#000000",
        },
      })
      return {
        ...state,
        elements: elements,
      }

    case "REMOVE_ELEMENT":
      const filteredElements = state["elements"].filter(
        (elem) => elem.id !== action.elementId
      )
      return {
        ...state,
        elements: filteredElements,
      }

    case "TEXT_CONTENT":
      return {
        ...state,
        elements: updateElementProperty(
          state["elements"],
          "textContent",
          action.elementId,
          action.content
        ),
      }

    case "SET_TEXT_COLOR":
      return {
        ...state,
        elements: updateElementStyleProperty(
          state["elements"],
          "color",
          action.elementId,
          action.color
        ),
      }

    case "SET_BG_COLOR":
      return {
        ...state,
        elements: updateElementStyleProperty(
          state["elements"],
          "backgroundColor",
          action.elementId,
          action.color
        ),
      }

    default:
      throw new Error(`Unknown action type!`)
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [styleRefreshKey, setStyleRefreshKey] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const storyRef = useRef<null | HTMLDivElement>(null)

  const addElementHandler = () => {
    dispatch({ type: "ADD_ELEMENT", elementId: nanoid(5) })
  }
  const removeElementHandler = (elementId: string) => {
    dispatch({ type: "REMOVE_ELEMENT", elementId })
  }

  const textContentHandler = (content: string, elementId: string) => {
    dispatch({ type: "TEXT_CONTENT", elementId, content })
  }

  const handleBgColor = (elementId: string, color: string) => {
    dispatch({ type: "SET_BG_COLOR", color, elementId })
    setStyleRefreshKey(Math.random())
  }
  const handleTextColor = (elementId: string, color: string) => {
    dispatch({ type: "SET_TEXT_COLOR", color, elementId })
    setStyleRefreshKey(Math.random())
  }

  const downloadImageHandler = () => {
    if (storyRef.current && imageLoaded) {
      html2canvas(storyRef.current)
        .then((canvas) => {
          const dataUrl = canvas.toDataURL()
          const link = document.createElement("a")
          link.href = dataUrl
          link.download = "story.png"
          link.click()
        })
        .catch((error) => {
          console.error("Error generating image:", error)
        })
    }
  }

  return (
    <main className="w-full relative h-screen flex items-center gap-3 flex-wrap overflow-hidden">
      <Sidebar
        addElementHandler={addElementHandler}
        removeElementHandler={removeElementHandler}
        setTextContent={textContentHandler}
        setTextColor={(elementId, color) => handleTextColor(elementId, color)}
        setBgColor={(elementId, color) => handleBgColor(elementId, color)}
        downloadImageHandler={downloadImageHandler}
        state={state}
      />

      <section className="w-full flex-1 h-full relative flex items-center justify-center max-w-xs mx-auto flex-col">
        <Dropzone
          setImage={(newImage) => {
            dispatch({ type: "SET_IMAGE", imagePreview: newImage.imagePreview })
          }}
        />

        <div
          ref={storyRef}
          className="w-full relative aspect-[1/2] bg-slate-100 rounded-b-md"
        >
          {state.imagePreview ? (
            <>
              <div className="w-full h-full object-fit">
                <Image
                  src={state.imagePreview}
                  alt="Your uploaded image"
                  onLoad={() => {
                    setImageLoaded(true)
                    URL.revokeObjectURL(state.imagePreview)
                  }}
                  fill={true}
                />
              </div>

              {state["elements"].length && (
                <div className="absolute top-0 w-full h-full right-0 z-10">
                  {state["elements"].map((element) => (
                    <TextElement
                      key={element.id}
                      element={element}
                      refreshStyleKey={styleRefreshKey}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center m-1">
              Your uploaded image will appear here!
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
