import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { Register } from 'pages/Login/Register'
import { ForgotPassword } from 'pages/Login/ForgotPassword'
import { Login } from 'pages/Login/Login'

export default function AppRouter() {
	return (
		<Router>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<NotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</Router>
	)
}

function NotFound() {
	return <Navigate to="/login" replace />
}
