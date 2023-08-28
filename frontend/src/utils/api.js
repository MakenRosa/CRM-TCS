import axios from "axios"
import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Constantes para códigos de status HTTP
const CONFLICT = 409
const FORBIDDEN = 403
const INTERNAL_SERVER_ERROR = 500
const UNAUTHORIZED = 401

const MS_PER_SECOND = 1000

// URLs de endpoints para autenticação
const LOGIN_URL = "/auth/login"
const REGISTER_URL = "/auth/register"
const REFRESH_TOKEN_URL = "/auth/refresh-token"

const refreshToken = async () => {
  const refresh_token = sessionStorage.getItem("refresh_token")
  try {
    const response = await api.post(REFRESH_TOKEN_URL, {}, {
      headers: { Authorization: `Bearer ${ refresh_token }` }
    })
    sessionStorage.setItem("token", response.data.access_token)
    return response.data.access_token
  } catch (error) {
    throw new Error("Erro ao atualizar o token")
  }
}

const handleErrorResponse = async error => {
  const status = error?.response?.status
  const errorMessage = error?.response?.data?.message

  if (status === UNAUTHORIZED) {
    // Captura mensagem específica para erro de login
    if (error.config.url.endsWith(LOGIN_URL)) {
      toast.error("Usuário e/ou senha inválidos.")
      return Promise.reject(error)
    }

    if (error.config.url !== REFRESH_TOKEN_URL) {
      try {
        const newToken = await refreshToken()
        error.config.headers['Authorization'] = `Bearer ${ newToken }`
        return api.request(error.config)
      } catch (refreshError) {
        logoutUser()
        return Promise.reject(error)
      }
    } else {
      logoutUser()
      return Promise.reject(error)
    }
  }

  const message = getErrorMessage(status, errorMessage)
  toast.error(message)
  return Promise.reject(error)
}

const getErrorMessage = (status, errorMessage) => {
  const defaultMessages = {
    [CONFLICT]: "Este E-mail já está cadastrado.",
    [FORBIDDEN]: "Você não tem permissão para acessar este recurso.",
    [INTERNAL_SERVER_ERROR]: "Erro interno do servidor. Tente novamente mais tarde."
  }

  return errorMessage || defaultMessages[status] || "Um erro ocorreu. Por favor, tente novamente."
}

const logoutUser = () => {
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("refresh_token")
  window.location.href = "/login"
}

const api = axios.create({
  baseURL: "http://localhost:8000"
})

api.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${ token }`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => {
    if (response?.data?.message) {
      toast.success(response.data.message)
    }
    return response
  },
  handleErrorResponse
)

const getToken = () => {
  const token = sessionStorage.getItem("token")
  if (!token) {
    return null
  }
  const decoded = jwtDecode(token)
  const currentTime = Date.now() / MS_PER_SECOND
  const isValid = decoded.exp > currentTime
  if (isValid) {
    return token
  }
  return null
}

// Função para verificar a validade do token
const verifyToken = async () => {
  const token = sessionStorage.getItem("token")
  if (!token) {return false}
  
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / MS_PER_SECOND
    const isValid = decoded.exp > currentTime
    
    if (!isValid) {
      await refreshToken() // Atualiza o token se estiver expirado
    }
    
    return isValid
  } catch (error) {
    return false
  }
}


const loginUser = user => api.post(LOGIN_URL, user)
const registerUser = user => api.post(REGISTER_URL, user)

export { api, loginUser, registerUser, refreshToken, logoutUser, verifyToken }
