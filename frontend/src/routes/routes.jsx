import { AuthLayout, Dashboard, ForgotPassword, Login, Register } from "pages"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { refreshTokenIfNeeded } from "utils"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { NotFound } from "pages/NotFound/NotFound"

const MS = 1000
const SECONDS = 60
const MINUTES = 5
const REFRESH_TOKEN_INTERVAL_MS = MS * SECONDS * MINUTES // Define o intervalo para a atualização do token de acesso

export const AppRouter = () => 
  <Router>
    <InnerAppRouter />
  </Router>

const InnerAppRouter = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenIfNeeded(navigate) // Atualiza o token de acesso se necessário
    }, REFRESH_TOKEN_INTERVAL_MS)
    return () => clearInterval(interval) // Limpa o intervalo quando o componente é desmontado
  }, [navigate])

  return (
    <>
      <CssBaseline />
      <ToastContainer hideProgressBar position="top-center" /> {/* Configuração de notificações */}
      <Routes>
        <Route element={<Navigate replace to="/dashboard" />} path="/" /> {/* Redireciona da raiz para o painel */}
        <Route element={<AuthLayout />} path="/">
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
          <Route element={<ForgotPassword />} path="forgot-password" />
        </Route>
        <Route element={<Dashboard />} path="dashboard" />
        <Route element={<NotFound />} path="*" /> {/* Rota para página não encontrada */}
      </Routes>
    </>
  )
}
