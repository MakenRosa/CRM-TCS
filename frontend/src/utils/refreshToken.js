import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify'
import { refreshToken } from "./api"

// Constante para a chave do token no sessionStorage
const TOKEN_KEY = "token"
// Tempo em segundos antes da expiração do token para tentar renová-lo
const TIME_BEFORE_EXPIRATION = 600

// Função para verificar se o token precisa ser renovado e fazê-lo, se necessário
export const refreshTokenIfNeeded = async navigate => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  
  if (!token) { return } // Se não há token, a função retorna cedo

  // Decodifica o token JWT para obter o tempo de expiração
  const decoded = jwtDecode(token)
  const MS_IN_SECOND = 1000
  const currentTime = Date.now() / MS_IN_SECOND

  // Verifica se o token está prestes a expirar
  if (decoded.exp < currentTime + TIME_BEFORE_EXPIRATION) {
    try {
      // Tenta renovar o token
      const response = await refreshToken({
        headers: {
          'Authorization': `Bearer ${ token }`
        }
      })
      const newToken = response.data.token
      sessionStorage.setItem(TOKEN_KEY, newToken) // Atualiza o token no sessionStorage
    } catch (error) {
      console.error("Erro ao renovar o token:", error) // Log do erro no console
      // Notificação ao usuário sobre a falha na renovação do token
      toast.error("Falha na renovação do token, por favor, faça o login novamente.")
      sessionStorage.removeItem(TOKEN_KEY) // Remove o token antigo
      navigate("/login") // Redireciona o usuário para a página de login
    }
  }
}
