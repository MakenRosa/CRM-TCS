/* eslint-disable */

import { AuthLayout, Dashboard, ForgotPassword, Login, Register } from "pages"
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { refreshTokenIfNeeded } from "utils"
import { useEffect } from "react"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'



export const AppRouter =  () => {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTokenIfNeeded()
    }, 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [])

  return (
    <Router>
      <CssBaseline />
      <ToastContainer 
      hideProgressBar
      position="top-center"
    />
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
  )
}

// eslint-disable-next-line react/no-multi-comp
const NotFound = () => <Navigate replace to="/login" />

