import axios from "axios"

const SESSION_EXPIRED = 401
const FORBIDDEN = 403
const INTERNAL_SERVER_ERROR = 500


const api = axios.create({
  baseURL: "http://localhost:8000"
})

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token")
  if (token) {
    config.headers['Authorization'] = `Bearer ${ token }`
  }
  return config
}, error => Promise.reject(error))

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case SESSION_EXPIRED:
          alert("Sua sessão expirou. Por favor, faça o login novamente.")
          sessionStorage.removeItem("token")
          window.location = "/login"
          break
        case FORBIDDEN:
          alert("Você não tem permissão para acessar este recurso.")
          break
        case INTERNAL_SERVER_ERROR:
          alert("Erro interno do servidor. Tente novamente mais tarde.")
          break
        default:
          alert("Um erro ocorreu. Por favor, tente novamente.")
      }
    } else {
      alert("Erro ao fazer a requisição. Por favor, tente novamente.")
    }

    return Promise.reject(error)
  }
)

const loginUser = user => api.post("/auth/login", user)
  
const registerUser = user => api.post("/auth/register", user)

const refreshToken = config => api.post("/auth/refresh-token", {}, config)

export { api, loginUser, registerUser, refreshToken }
