import Form from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'

import loginImage from 'assets/login.png'

import { Link } from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'

import {
	StyledContainer,
	StyledLinks,
	StyledSectionImage,
	SectionLogin
} from './Login.styles'

export const Login = () => {
	return (
		<StyledContainer disableGutters maxWidth={false}>
			<SectionLogin>
				<h1>Login</h1>
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
					<Button
						variant="contained"
						type="submit"
						backgroundColor="linear-gradient(134deg, #9181f4 0%, #5038ed 100%)"
					>
						Login
					</Button>
				</Form>
			</SectionLogin>
			<StyledSectionImage>
				<img src={loginImage} alt="" />
			</StyledSectionImage>
		</StyledContainer>
	)
}

export default Login
