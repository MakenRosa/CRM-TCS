/* eslint-disable */

import jwtDecode from "jwt-decode"
import { refreshToken } from "./api"
import { useNavigate } from "react-router-dom"

export const refreshTokenIfNeeded = async () => {
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  
  if (!token) {return}

  const decoded = jwtDecode(token)
  const currentTime = Date.now() / 1000
  const timeBeforeExpiration = 600

  if (decoded.exp < currentTime + timeBeforeExpiration) {
    try {
      const response = await refreshToken({
        headers: {
          'Authorization': `Bearer ${ token }`
        }
      })
      const newToken = response.data.token
      sessionStorage.setItem("token", newToken)
    } catch (error) {
      console.error("Erro ao renovar o token:", error)
      sessionStorage.removeItem("token")
      navigate("/login")
    }
  }
}
