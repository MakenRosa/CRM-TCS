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
import Envite from "pages/Login/Envite";
import ResetPassword from './pages/Login/ResetPassword';


export const AppRouter =  () => 
  <Router>
    <CssBaseline />
    <Routes>
      <Route element={<NotFound />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<Envite />} path="/envite" />
      <Route element={<ResetPassword />} path="/reset-password" />



    </Routes>
  </Router>

export default AppRouter

// eslint-disable-next-line react/no-multi-comp
const NotFound = () => <Navigate replace to="/login" />

