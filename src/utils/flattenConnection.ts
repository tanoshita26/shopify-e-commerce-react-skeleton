interface NodeItem {
  node: any
}

interface ConItem {
  edges?: NodeItem[]
  nodes?: any[]
}

export const flattenConnection = (connectionArray: ConItem) => {
  if (
    !Array.isArray(connectionArray.edges) &&
    !Array.isArray(connectionArray.nodes)
  ) {
    return []
  }
  if (connectionArray.edges) {
    return connectionArray.edges.map(el => ({ ...el.node }))
  }
  if (connectionArray.nodes) {
    return connectionArray.nodes.map(el => el)
  }
  return []
}

export default flattenConnection
