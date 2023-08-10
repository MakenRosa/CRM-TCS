import Form from 'components/Form'
import { TextField } from 'components/TextField'
import Button from 'components/Button'
import { AccountCircle, Lock, Email, Check } from '@mui/icons-material'

import { AuthLayout } from './AuthLayout'
import { SectionLogin } from './SectionLogin'
import { Link } from 'react-router-dom'
import { StyledLinks } from './Login.styles'

export const Register = () => {
	return (
		<AuthLayout>
			<SectionLogin title="Cadastro">
				<Form>
					<TextField
						fullWidth
						placeholder="Matrícula ou CPF"
						variant="filled"
						type="text"
						icon={<AccountCircle />}
						position="start"
						size="small"
					/>
					<TextField
						fullWidth
						placeholder="Email"
						variant="filled"
						type="email"
						icon={<Email />}
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
					<TextField
						fullWidth
						placeholder="Confirme a Senha"
						variant="filled"
						type="password"
						icon={<Check />}
						position="start"
						size="small"
					/>
					<StyledLinks maxHeight="40px">
						<Button
							component={Link}
							to="/login"
							variant="outlined"
							className="btn--secondary"
						>
							Cancelar
						</Button>
						<Button variant="contained" type="submit" className="btn--primary">
							Cadastrar
						</Button>
					</StyledLinks>
				</Form>
			</SectionLogin>
		</AuthLayout>
	)
}
