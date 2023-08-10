import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { ForgotPassword } from "pages/Login/ForgotPassword"
import { Login } from "pages/Login/Login"
import { Register } from "pages/Login/Register"

export const AppRouter =  () => 
  <Router>
    <CssBaseline />
    <Routes>
      <Route element={<NotFound />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
    </Routes>
  </Router>

export default AppRouter

// eslint-disable-next-line react/no-multi-comp
const NotFound = () => <Navigate replace to="/login" />

