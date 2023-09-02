import { AuthLayout, Dashboard, ForgotPassword, Login, NotFound, Register, ResetPassword } from "pages"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const AppRouter = () => 
  <Router>
    <CssBaseline />
    <ToastContainer hideProgressBar position="top-center" theme="colored" />
    <Routes>
      <Route element={<Navigate replace to="/dashboard" />} path="/" /> {/* Redireciona da raiz para o painel */}
      <Route element={<AuthLayout />} path="/">
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
        <Route element={<ForgotPassword />} path="forgot-password" />
        <Route element={<ResetPassword />} path="/reset-password" />
      </Route>
      <Route element={<Dashboard />} path="dashboard" />
      <Route element={<NotFound />} path="*" /> {/* Rota para página não encontrada */}
    </Routes>
  </Router>


