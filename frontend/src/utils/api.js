import axios from "axios"
import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CONFLICT = 409
const FORBIDDEN = 403
const INTERNAL_SERVER_ERROR = 500
const UNAUTHORIZED = 401
const BAD_REQUEST = 400

const MS_PER_SECOND = 1000


const LOGIN_URL = "/auth/jwt/create/"
const REGISTER_URL = "/auth/users/"
const REFRESH_TOKEN_URL = "/auth/jwt/refresh/"
const RESET_PASSWORD_URL = "/auth/users/reset_password/"
const RESET_PASSWORD_CONFIRM_URL = "/auth/users/reset_password_confirm/"


const refreshToken = async () => {
  const refresh_token = sessionStorage.getItem("refresh")
  try {
    const response = await api.post(REFRESH_TOKEN_URL, {}, {
      headers: { Authorization: `Bearer ${ refresh_token }` }
    })
    sessionStorage.setItem("token", response.data.access)
    return response.data.access
  } catch (error) {
    throw new Error("Erro ao atualizar o token")
  }
}

const handleErrorResponse = async error => {
  const status = error?.response?.status
  const errorMessage = error?.response?.data?.message

  if (status === BAD_REQUEST) {
    const errors = error?.response?.data 
    if (errors) {
      for (const e in errors) {
        const badRequestMessage = error.config.url.endsWith(LOGIN_URL) ? `${ e }: ${ errors[e] }` : errors[e]
        toast.error(`${ badRequestMessage }`)
      }
    }
    return Promise.reject(error)
  }

  if (status === UNAUTHORIZED) {
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
    [INTERNAL_SERVER_ERROR]: "Erro interno do servidor. Tente novamente mais tarde.",
    [UNAUTHORIZED]: "Você não está autenticado.",
    [BAD_REQUEST]: "Erro de requisição. Por favor, tente novamente."
  }

  return errorMessage || defaultMessages[status] || "Um erro ocorreu. Por favor, tente novamente."
}

const logoutUser = () => {
  sessionStorage.removeItem("access")
  sessionStorage.removeItem("refresh")
  window.location.href = "/login"
}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
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
  const token = sessionStorage.getItem("access")
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

const verifyToken = async () => {
  const token = sessionStorage.getItem("access")
  if (!token) {return false}
  
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / MS_PER_SECOND
    const isValid = decoded.exp > currentTime
    
    if (!isValid) {
      await refreshToken()
    }
    
    return isValid
  } catch (error) {
    return false
  }
}

const loginUser = user => api.post(LOGIN_URL, user)
const registerUser = user => api.post(REGISTER_URL, user)
const resetPassword = async data => await api.post(RESET_PASSWORD_URL, data)
const resetConfirmPassword = async data => await api.post(RESET_PASSWORD_CONFIRM_URL, data)

export { api, loginUser, registerUser, refreshToken, logoutUser, verifyToken, resetPassword, resetConfirmPassword }
