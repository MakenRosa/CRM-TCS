import axios from "axios"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Constantes para códigos de status HTTP
const CONFLICT = 409
const FORBIDDEN = 403
const INTERNAL_SERVER_ERROR = 500
const UNAUTHORIZED = 401

// URLs de endpoints para autenticação
const LOGIN_URL = "/auth/login"
const REGISTER_URL = "/auth/register"
const REFRESH_TOKEN_URL = "/auth/refresh-token"

// Função para manipular respostas de erro e exibir mensagens relevantes
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
  toast.error(message) // Mostra a mensagem de erro usando a biblioteca toast
  return Promise.reject(error)
}

// Criação da instância do Axios com URL base
const api = axios.create({
  baseURL: "http://localhost:8000"
})

// Interceptor para adicionar o token ao cabeçalho, se existir
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

// Interceptor para lidar com a resposta, incluindo sucesso e erro
api.interceptors.response.use(
  response => {
    if (response?.data?.message) {
      toast.success(response.data.message) // Mostra a mensagem de sucesso, se existir
    }
    return response
  }, handleErrorResponse
)

// Funções para interagir com os endpoints de autenticação
const loginUser = user => api.post(LOGIN_URL, user)
const registerUser = user => api.post(REGISTER_URL, user)
const refreshToken = config => api.post(REFRESH_TOKEN_URL, {}, config)

export { api, loginUser, registerUser, refreshToken }
