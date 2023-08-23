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
const REFRESH_TOKEN_INTERVAL_MS = MS * SECONDS * MINUTES

export const AppRouter = () => 
  <Router>
    <InnerAppRouter />
  </Router>


const InnerAppRouter = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenIfNeeded(navigate)
    }, REFRESH_TOKEN_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [navigate])

  return (
    <>
      <CssBaseline />
      <ToastContainer hideProgressBar position="top-center" />
      <Routes>
        <Route element={<Navigate replace to="/dashboard" />} path="/" />
        <Route element={<AuthLayout />} path="/">
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
          <Route element={<ForgotPassword />} path="forgot-password" />
        </Route>
        <Route element={<Dashboard />} path="dashboard" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  )
}
