import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from 'pages/Login'
import { CssBaseline } from '@mui/material'

export default function AppRouter() {
	return (
		<Router>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Login />} />
			</Routes>
		</Router>
	)
}
