import { AuthContext } from "@/context"
import { useContext } from "react"

export const UseAuth = () => {
    return useContext(AuthContext)
}