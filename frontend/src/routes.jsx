import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { AuthLayout } from "pages/Login/AuthLayout"
import { CssBaseline } from "@mui/material"
import { Dashboard } from "pages/Dashboard/Dashboard"
import { ForgotPassword } from "pages/Login/ForgotPassword"
import { Login } from "pages/Login/Login"
import { Register } from "pages/Login/Register"

export const AppRouter =  () => 
  <Router>
    <CssBaseline />
    <Routes>
      <Route element={<Navigate replace to="/dashboard" />} path="/" />
      <Route element={<AuthLayout />} path="/">
        <Route element={<Login />} index path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
      </Route>
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  </Router>

export default AppRouter

// eslint-disable-next-line react/no-multi-comp
const NotFound = () => <Navigate replace to="/login" />

