import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CONFLICT = 409
const FORBIDDEN = 403
const INTERNAL_SERVER_ERROR = 500
const UNAUTHORIZED = 401

const LOGIN_URL = "/auth/login"
const REGISTER_URL = "/auth/register"
const REFRESH_TOKEN_URL = "/auth/refresh-token"

const handleErrorResponse = error => {
  let message = error?.response?.data?.message || "Um erro ocorreu. Por favor, tente novamente."
  switch (error?.response?.status) {
    case CONFLICT:
      message = error?.response?.data?.message || "Este E-mail já está em cadastrado."
      break
    case FORBIDDEN:
      message = error?.response?.data?.message || "Você não tem permissão para acessar este recurso."
      break
    case UNAUTHORIZED:
      message = error?.response?.data?.message || "Você não está autenticado."
      break
    case INTERNAL_SERVER_ERROR:
      message = error?.response?.data?.message || "Erro interno do servidor. Tente novamente mais tarde."
      break
    default:
      break
  }
  toast.error(message)
  return Promise.reject(error)
}

const api = axios.create({
  baseURL: "http://localhost:8000"
})

api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("token")
    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
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
  }, handleErrorResponse
)

const loginUser = user => api.post(LOGIN_URL, user)

const registerUser = user => api.post(REGISTER_URL, user)

const refreshToken = config => api.post(REFRESH_TOKEN_URL, {}, config)

export { api, loginUser, registerUser, refreshToken }
