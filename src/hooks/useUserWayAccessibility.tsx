import { useEffect, useMemo, useState } from "react"
import Cookies from "js-cookie"

const TN_USERWAY = "TN_USERWAY"

const isBrowser = typeof window !== "undefined"

export default function useUserWayAccessiblity() {
  const [enabled, setEnabled] = useState<boolean>(false)

  function initialize() {
    // check if cookie exists and set enabled
    const userWayEnabled = Cookies.get(TN_USERWAY)
    if (userWayEnabled) {
      setEnabled(true)
    }
  }

  function addScript(enabled: boolean) {
    if (enabled) {
      const link = document.createElement("script")
      link.type = "text/javascript"
      link.src = "https://cdn.userway.org/widget.js"
      link.dataset.account = "cR45yXtUEr"
      document.head.appendChild(link)
    }
  }

  function toggleWidget(enable: boolean) {
    try {
      if (enable) {
        setEnabled(true)
        Cookies.set(TN_USERWAY, { enabled: true }, { expires: 365 })
      } else {
        Cookies.remove(TN_USERWAY)
        if (isBrowser) location.reload()
      }
    } catch (err: any) {
      console.log("Error toggling widget", err)
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    addScript(enabled)
  }, [enabled])

  const value = useMemo(
    () => ({ initialize, enabled, toggleWidget }),
    [enabled, initialize]
  )

  return value
}
