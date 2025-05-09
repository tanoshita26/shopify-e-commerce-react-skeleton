import { useContext } from "react"

import CartContext from "./context"

const useCart = () => useContext(CartContext)
export default useCart
