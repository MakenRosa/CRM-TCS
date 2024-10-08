import { AuthLayout, Dashboard, ForgotPassword, Login, NotFound, Register, ResetPassword, BaseLayout, Leads, RegisterLead, Prospeccao, RegisterProspeccao, Teams, Relatorios } from "pages"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Oportunidade } from "pages/Oportunidade"

export const AppRouter = () => 
  <Router>
    <CssBaseline />
    <ToastContainer hideProgressBar limit={2} newestOnTop position="top-center" theme="colored" />
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
        <Route element={<Oportunidade />} path="oportunidades/:leadId/:prospectId" />
        <Route element={<Teams />} path="equipe" />
        <Route element={<Relatorios />} path="relatorios" />
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  </Router>


