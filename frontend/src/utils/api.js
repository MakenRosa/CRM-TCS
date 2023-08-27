import axios from "axios"
import jwtDecode from "jwt-decode"
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

const refreshToken = async () => {
  const refresh_token = sessionStorage.getItem("refresh_token")
  try {
    const response = await api.post(REFRESH_TOKEN_URL, {}, {
      headers: { 'Authorization': `Bearer ${ refresh_token }` }
    })
    sessionStorage.setItem("token", response.data.access_token)
    return response.data.access_token
  } catch (error) {
    throw new Error("Erro ao atualizar o token")
  }
}


// Função para manipular respostas de erro e exibir mensagens relevantes
const handleErrorResponse = async error => {
  let message = error?.response?.data?.message || "Um erro ocorreu. Por favor, tente novamente."
  
  if (error?.response?.status === UNAUTHORIZED) {
    try {
      const newToken = await refreshToken()
      error.config.headers['Authorization'] = `Bearer ${ newToken }`
      return api.request(error.config)
    } catch (refreshError) {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("refresh_token")
      window.location.href = '/login' // redirecionar para a página de login
    }
  }
  switch (error?.response?.status) {
    case CONFLICT:
      message = error?.response?.data?.message || "Este E-mail já está cadastrado."
      break
    case FORBIDDEN:
      message = error?.response?.data?.message || "Você não tem permissão para acessar este recurso."
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

// Criação da instância do Axios com URL base
const api = axios.create({
  baseURL: "http://localhost:8000"
})

// Interceptor para adicionar o token ao cabeçalho, se existir
api.interceptors.request.use(
  config => {
    const token = getToken()
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
  },
  handleErrorResponse // Atualizado para usar a versão nova que inclui a lógica de refreshToken
)

// Funções para interagir com os endpoints de autenticação
const loginUser = user => api.post(LOGIN_URL, user)
const registerUser = user => api.post(REGISTER_URL, user)

export { api, loginUser, registerUser, refreshToken }

const getToken=() => {
  const token = sessionStorage.getItem("token")
  if (!token) {
    return null
  } 
  const decoded = jwtDecode(token)
  const currentTime = Date.now() / 1000
  const isValid = decoded.exp > currentTime
  console.log(isValid)
  if(isValid) {
    return token
  } 
    return null
  
}