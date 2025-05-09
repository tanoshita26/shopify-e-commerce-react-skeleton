import React, {
  createContext,
  ReactChild,
  useState,
  useMemo,
  useReducer,
} from "react"

interface rxDetails {
  sph: string
  cyl: string
  axis: string
  add: string
  pd: string
}
interface rxType {
  right: rxDetails
  left: rxDetails
  lensPower?: string
}

const rxInit: rxType = {
  right: {
    sph: "0.00",
    cyl: "0.00",
    axis: "",
    add: "",
    pd: "63.0",
  },
  left: {
    sph: "0.00",
    cyl: "0.00",
    axis: "",
    add: "",
    pd: "63.0",
  },
  lensPower: "",
}

export const handleRxFromAttribute = (input: rxType) => {
  try {
    const defaultPrescription = {
      sph: "0.00",
      cyl: "0.00",
      axis: "",
      add: "",
      pd: "63.0",
    }
    const defaultContext = {
      right: { ...defaultPrescription },
      left: { ...defaultPrescription },
      lensPower: "",
    }
    let context = { ...defaultContext }
    if (input.hasOwnProperty("lensPower")) {
      context.lensPower = input.lensPower ?? ""
    }
    if (input.hasOwnProperty("right") && input.hasOwnProperty("left")) {
      context.right = { ...input.right }
      context.left = { ...input.left }
    }
    return context
  } catch (error) {
    return defaultContext
  }
}

const defaultContext = {
  isRxAble: false,
  rxInfo: rxInit,
  rxInfoDispatch: Dispatch => {},
  setRxAble: (isRxAble: boolean) => {},
}

const actionList = {
  RIGHT_SPH: "right-sph",
  RIGHT_CYL: "right-cyl",
  RIGHT_AXIS: "right-axis",
  RIGHT_ADD: "right-add",
  RIGHT_PD: "right-pd",
  LEFT_SPH: "left-sph",
  LEFT_CYL: "left-cyl",
  LEFT_AXIS: "left-axis",
  LEFT_ADD: "left-add",
  LEFT_PD: "left-pd",
  FULL: "full",
  RESET: "reset",
  POWER: "lens-power",
}
const reducer = (state, action) => {
  switch (action.type) {
    case actionList.RIGHT_SPH:
      return { ...state, right: { ...state.right, sph: action.payload } }
    case actionList.RIGHT_CYL:
      return { ...state, right: { ...state.right, cyl: action.payload } }
    case actionList.RIGHT_AXIS:
      return { ...state, right: { ...state.right, axis: action.payload } }
    case actionList.RIGHT_ADD:
      return { ...state, right: { ...state.right, add: action.payload } }
    case actionList.RIGHT_PD:
      return { ...state, right: { ...state.right, pd: action.payload } }
    case actionList.LEFT_SPH:
      return { ...state, left: { ...state.left, sph: action.payload } }
    case actionList.LEFT_CYL:
      return { ...state, left: { ...state.left, cyl: action.payload } }
    case actionList.LEFT_AXIS:
      return { ...state, left: { ...state.left, axis: action.payload } }
    case actionList.LEFT_ADD:
      return { ...state, left: { ...state.left, add: action.payload } }
    case actionList.LEFT_PD:
      return { ...state, left: { ...state.left, pd: action.payload } }
    case actionList.POWER:
      return { ...state, lensPower: action.payload }
    case actionList.FULL:
      return handleRxFromAttribute(action.payload)
    case actionList.RESET:
      return rxInit
    default:
      return state
  }
}

export const RxInfoContext = createContext(defaultContext)

export const RxInfoContextProvider = ({
  children,
}: {
  children: ReactChild
}) => {
  const [isRxAble, setRxAble] = useState(false)
  const [rxInfo, rxInfoDispatch] = useReducer(reducer, rxInit)

  const value = useMemo(
    () => ({
      isRxAble,
      setRxAble,
      rxInfo,
      rxInfoDispatch,
    }),
    [isRxAble, rxInfo]
  )

  return (
    <RxInfoContext.Provider value={value}>{children}</RxInfoContext.Provider>
  )
}
