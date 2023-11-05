import { AuthLayout, Dashboard, ForgotPassword, Login, NotFound, Register, ResetPassword, BaseLayout, Leads, RegisterLead, Prospeccao, RegisterProspeccao, Teams } from "pages"
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
      <Route element={<Navigate replace to="/dashboard" />} path="/" />
      <Route element={<AuthLayout />} path="/">
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
        <Route element={<ForgotPassword />} path="forgot-password" />
        <Route element={<ResetPassword />} path="/reset-password" />
      </Route>
      <Route element={<BaseLayout />} path="/">
        <Route element={<Dashboard />} index path="dashboard" />
        <Route element={<Leads />} path="leads" />
        <Route element={<RegisterLead />} path="leads/register" />
        <Route element={<Prospeccao />} path="oportunidades" />
        <Route element={<RegisterProspeccao />} path="oportunidades/register" />
        <Route element={<Teams />} path="equipe" />
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  </Router>


