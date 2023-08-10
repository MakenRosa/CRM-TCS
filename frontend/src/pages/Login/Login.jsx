import Form from 'components/Form'
import { TextField } from 'components/TextField'
import Button from 'components/Button'

import { Link } from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'

import { StyledLinks } from './Login.styles'
import { AuthLayout } from './AuthLayout'
import { SectionLogin } from './SectionLogin'

export const Login = () => {
	return (
		<AuthLayout>
			<SectionLogin title="Login">
				<Form>
					<TextField
						fullWidth
						placeholder="CPF ou Matrícula"
						variant="filled"
						type="text"
						icon={<AccountCircle />}
						position="start"
						size="small"
					/>
					<TextField
						fullWidth
						placeholder="Senha"
						variant="filled"
						type="password"
						icon={<Lock />}
						position="start"
						size="small"
					/>
					<StyledLinks>
						<Link
							href="/register"
							underline="none"
							fontWeight={700}
							fontSize={14}
							color="#430331"
						>
							Primeiro acesso?
						</Link>
						<Link
							href="/forgot-password"
							marginTop="-10px"
							color="#8a8086"
							fontSize={13}
						>
							Esqueceu a senha?
						</Link>
					</StyledLinks>
					<Button variant="contained" type="submit" className="btn--primary">
						Login
					</Button>
				</Form>
			</SectionLogin>
		</AuthLayout>
	)
}
