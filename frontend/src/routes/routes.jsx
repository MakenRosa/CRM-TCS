import { AuthLayout, Dashboard, ForgotPassword, Login, Register } from "pages"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { NotFound } from "pages/NotFound/NotFound"
import { ResetPassword } from "pages/Login"
import Envite from "pages/Login/Envite"

export const AppRouter = () => 
  <Router>
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
      <Route element={<Envite />} path="/envite" />
      <Route element={<ResetPassword />} path="/reset-password" />
    </Routes>
  </Router>


