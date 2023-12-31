import axios from "axios"
import jwtDecode from "jwt-decode"
import "react-toastify/dist/ReactToastify.css"

const UNAUTHORIZED = 401

const MS_PER_SECOND = 1000

const LOGIN_URL = "/auth/jwt/create/"
const REGISTER_URL = "/auth/users/"
const GET_USER_URL = "/auth/users/"
const DELETE_USER_URL = "/auth/users/"
const DELETE_USER_FROM_GROUP_URL = "/api/grupo/excluir/"
const REFRESH_TOKEN_URL = "/auth/jwt/refresh/"
const RESET_PASSWORD_URL = "/auth/users/reset_password/"
const RESET_PASSWORD_CONFIRM_URL = "/auth/users/reset_password_confirm/"
const CREATE_LEAD_URL = "/api/leads/"
const GET_LEADS_URL = "/api/leads/"
const UPDATE_LEAD_URL = "/api/leads/"
const DELETE_LEAD_URL = "/api/leads/"
const CREATE_PROSPECCAO_URL = "/api/prospeccao/"
const GET_PROSPECCAO_URL = "/api/prospeccao/"
const GET_UNIQUE_PROSPECCAO_URL = "/api/prospeccao/"
const UPDATE_PROSPECCAO_URL = "/api/prospeccao/"
const DELETE_PROSPECCAO_URL = "/api/prospeccao/"
const GET_TEAMS_URL = "/api/grupo/"

const SEND_GROUP_INVITE_URL = "/send_email/"

const GET_TOTALS_URL = "/api/totals/"



const refreshToken = async () => {
  const refresh_token = sessionStorage.getItem("refresh")
  try {
    const response = await api.post(REFRESH_TOKEN_URL, {}, {
      headers: { Authorization: `Bearer ${ refresh_token }` }
    })
    sessionStorage.setItem("access", response.data.access)
    return response.data.access
  } catch (error) {
    throw new Error("Erro ao atualizar o token")
  }
}

const handleErrorResponse = async error => {
  const status = error?.response?.status

  if (status === UNAUTHORIZED) {
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
  return Promise.reject(error)
}

const logoutUser = () => {
  sessionStorage.removeItem("access")
  sessionStorage.removeItem("refresh")
  sessionStorage.removeItem("user_id")
  sessionStorage.removeItem("username")
  if (window.location.pathname !== "/login") {
    window.location.href = "/login"
  }
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
  response => response,
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

const getUser = async id => await api.get(`${ GET_USER_URL }${ id }/`)
const loginUser = user => api.post(LOGIN_URL, user)
const registerUser = user => api.post(REGISTER_URL, user)
const deleteUser = async data => await api.delete(`${ DELETE_USER_URL }${ data.id }/`, data)
const deleteUserFromGroup = async id_excluido => await api.delete(`${ DELETE_USER_FROM_GROUP_URL }`, { params: { id_excluido } })
const resetPassword = async data => await api.post(RESET_PASSWORD_URL, data)
const resetConfirmPassword = async data => await api.post(RESET_PASSWORD_CONFIRM_URL, data)
const createLead = async data => await api.post(CREATE_LEAD_URL, data) 
const getLeads = async user_id => await api.get(GET_LEADS_URL, { params: { user_id }  })
const updateLead = async (cnpj, data) => await api.patch(`${ UPDATE_LEAD_URL }${ cnpj }`, data)
const deleteLead = async cnpj => await api.delete(`${ DELETE_LEAD_URL }${ cnpj }` )
const createProspeccao = async data => await api.post(CREATE_PROSPECCAO_URL, data)
const getProspeccao = async user_id => await api.get(GET_PROSPECCAO_URL, { params: { user_id }  })
const getUniqueProspeccao = async id => await api.get(`${ GET_UNIQUE_PROSPECCAO_URL }${ id }/` )
const updateProspeccao = async (id, data) => await api.patch(`${ UPDATE_PROSPECCAO_URL }${ id }/`, data )
const deleteProspeccao = async id => await api.delete(`${ DELETE_PROSPECCAO_URL }${ id }/` )
const getTotals = async user_id => await api.get(GET_TOTALS_URL, { params: { user_id }  })
const getTeam = async user_id => await api.get(GET_TEAMS_URL, { params: { user_id }  })
const sendGroupInvite = async (data, user_id) => await api.post(SEND_GROUP_INVITE_URL, data, { params: { user_id } })

export { api, loginUser, registerUser, refreshToken, logoutUser, verifyToken, resetPassword, resetConfirmPassword, createLead, getLeads, updateLead, deleteLead, createProspeccao, getProspeccao, updateProspeccao, deleteProspeccao, getUniqueProspeccao, getTotals, getTeam, sendGroupInvite, deleteUserFromGroup, getUser, deleteUser }
