import React, { createContext, ReactChild, useState, useMemo } from "react"

interface DefaultContext {
  errorModalIsOpen: boolean
  renderErrorModal: (error?: string, callback?: any) => void
  closeErrorModal: () => void
  onAfterOpen: (cb: any) => void
  onAfterClose: (cb: any) => void
  errorMsg: string
}

const defaultContext: DefaultContext = {
  errorModalIsOpen: false,
  renderErrorModal: () => {},
  closeErrorModal: () => {},
  onAfterOpen: cb => cb,
  onAfterClose: cb => cb,
  errorMsg: "",
}

export const ErrorModalContext = createContext(defaultContext)

export const ErrorModalProvider = ({ children }: { children: ReactChild }) => {
  const [errorModalIsOpen, setErrorModalIsOpen] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [cb, setCb] = useState<any>(undefined)

  const renderErrorModal = (
    error: string = "Something Went Wrong",
    callback: any = undefined
  ) => {
    if (typeof error === "function") {
      setCb(() => error)
    } else {
      setErrorMsg(error)
      if (callback) {
        setCb(() => callback)
      } else {
        setCb(undefined)
      }
    }
    setErrorModalIsOpen(true)
  }

  const isBrowser = typeof window !== "undefined"
  if (isBrowser) window.renderErrorModal = renderErrorModal

  const closeErrorModal = () => {
    setErrorModalIsOpen(false)
  }

  const onAfterOpen = (cb: any) => cb

  const onAfterClose = () => {
    if (cb) cb()
  }

  const value = useMemo(
    () => ({
      errorModalIsOpen,
      renderErrorModal,
      closeErrorModal,
      onAfterOpen,
      onAfterClose,
      errorMsg,
    }),
    [errorModalIsOpen, errorMsg]
  )

  return (
    <ErrorModalContext.Provider value={value}>
      {children}
    </ErrorModalContext.Provider>
  )
}
