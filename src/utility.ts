// Update element property in an object
function updateElementProperty(
  elements: State["elements"],
  propertyName: keyof ElementType,
  elementId: string,
  value: string
): ElementType[] {
  const copiedElements = elements
  const foundElement = copiedElements.find((elem) => elem.id === elementId)
  if (foundElement && propertyName !== "style")
    foundElement[propertyName] = value

  return copiedElements
}

// Update elements style properties
function updateElementStyleProperty(
  elements: State["elements"],
  propertyName: keyof ElementType["style"],
  elementId: string,
  value: string
): ElementType[] {
  const copiedElements = elements
  const foundElement = copiedElements.find((elem) => elem.id === elementId)
  if (foundElement) foundElement.style[propertyName] = value

  return copiedElements
}

export { updateElementStyleProperty, updateElementProperty }
