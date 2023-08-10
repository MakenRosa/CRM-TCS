import Form from 'components/Form'
import { TextField } from 'components/TextField'
import Button from 'components/Button'
import { Email } from '@mui/icons-material'

import { AuthLayout } from './AuthLayout'
import { SectionLogin } from './SectionLogin'

export const ForgotPassword = () => {
	return (
		<AuthLayout>
			<SectionLogin title="Recuperar Senha">
				<p>
					Informe seu e-mail para receber instruções sobre como redefinir sua
					senha.
				</p>
				<Form>
					<TextField
						fullWidth
						placeholder="Email"
						variant="filled"
						type="email"
						icon={<Email />}
						position="start"
						size="small"
					/>
					<Button variant="contained" type="submit" className="btn--primary">
						Enviar
					</Button>
				</Form>
			</SectionLogin>
		</AuthLayout>
	)
}
