import React, { useState, useRef, useEffect } from "react"
import ResizeObserver from "resize-observer-polyfill"

export function usePrevious(value: boolean) {
  const ref = useRef(false)
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef<HTMLDivElement>(null)
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]: any) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}
