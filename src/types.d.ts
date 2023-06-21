interface Image {
  imagePreview: string
}

interface ElementType {
  id: string
  textContent: string
  style: {
    color: string
    backgroundColor: string
  }
}

interface State extends Image {
  elements: ElementType[]
}

type Action =
  | {
      type: "SET_IMAGE"
      imagePreview: string
    }
  | {
      type: "ADD_ELEMENT"
      elementId: string
    }
  | {
      type: "REMOVE_ELEMENT"
      elementId: string
    }
  | {
      type: "TEXT_CONTENT"
      elementId: string
      content: string
    }
  | {
      type: "SET_TEXT_COLOR"
      elementId: string
      color: string
    }
  | {
      type: "SET_BG_COLOR"
      elementId: string
      color: string
    }

enum ActionTypes {
  setImage = "SET_IMAGE",
}
