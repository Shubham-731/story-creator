import React, { useEffect, useRef } from "react"
import interact from "interactjs"

const TextElement = ({
  element,
  refreshStyleKey,
}: {
  element: ElementType
  refreshStyleKey: number
}) => {
  useEffect(() => {
    const dragMoveListener = (event: any) => {
      const target = event.target
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy

      target.style.transform = `translate(${x}px, ${y}px)`

      target.setAttribute("data-x", x.toString())
      target.setAttribute("data-y", y.toString())
    }

    interact(".resize-drag")
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move(event) {
            var target = event.target
            var x = parseFloat(target.getAttribute("data-x")) || 0
            var y = parseFloat(target.getAttribute("data-y")) || 0

            // update the element's style
            target.style.width = event.rect.width + "px"
            target.style.height = event.rect.height + "px"

            // translate when resizing from top or left edges
            x += event.deltaRect.left
            y += event.deltaRect.top

            target.style.transform = "translate(" + x + "px," + y + "px)"

            target.setAttribute("data-x", x)
            target.setAttribute("data-y", y)
            /* target.textContent =
              Math.round(event.rect.width) +
              "\u00D7" +
              Math.round(event.rect.height) */
          },
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: "parent",
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
          }),
        ],

        inertia: true,
      })
      .draggable({
        listeners: { move: dragMoveListener },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
      })
  }, [])

  const elementRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      Object.keys(element.style).forEach((key: any) => {
        elementRef.current!.style[key] =
          element.style[key as keyof typeof element.style]
      })
    }
  }, [refreshStyleKey, element])

  return (
    <div
      ref={elementRef}
      className="resize-drag overflow-hidden p-3 w-fit h-fit"
    >
      {element.textContent}
    </div>
  )
}

export default TextElement
