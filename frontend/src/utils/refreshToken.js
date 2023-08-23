import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify'
import { refreshToken } from "./api"

const TOKEN_KEY = "token"
const TIME_BEFORE_EXPIRATION = 600

export const refreshTokenIfNeeded = async navigate => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  
  if (!token) { return }

  const decoded = jwtDecode(token)
  const MS_IN_SECOND = 1000
  const currentTime = Date.now() / MS_IN_SECOND

  if (decoded.exp < currentTime + TIME_BEFORE_EXPIRATION) {
    try {
      const response = await refreshToken({
        headers: {
          'Authorization': `Bearer ${ token }`
        }
      })
      const newToken = response.data.token
      sessionStorage.setItem(TOKEN_KEY, newToken)
    } catch (error) {
      console.error("Erro ao renovar o token:", error)
      toast.error("Falha na renovação do token, por favor, faça o login novamente.") // Notificação ao usuário
      sessionStorage.removeItem(TOKEN_KEY)
      navigate("/login")
    }
  }
}
