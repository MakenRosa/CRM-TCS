import { Button, Form, TextField } from "components"
import { Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { StyledLinks, SectionLogin } from "pages"
import { useEffect, useState } from "react"
import { resetPassword, verifyToken } from "utils"

export const ForgotPassword = () => {
  // Determina se o usuário está logado
  const [isLogged, setIsLogged] = useState()
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const initialVerify = async () => {
      setIsLogged(await verifyToken())
    }
    initialVerify()
  }, [])

  // Se logado, redireciona para o dashboard
  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  // Função para enviar a solicitação de recuperação de senha
  const onSubmitPasswordRecovery = event => {
    event.preventDefault()
    const user = {
      email
    }
    resetPassword(user)
      .then(() => {
        navigate('/login')
      })
    }
      
  return (
    <SectionLogin h="50%" title="Recuperar Senha">
      <p>Informe seu e-mail para receber instruções sobre como redefinir sua senha.</p>
      <Form>
        <TextField
          fullWidth
          icon={<Email />}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          position="start"
          size="small"
          type="email"
          variant="filled"
        /> {/* Campo de entrada de e-mail */}
        <StyledLinks maxHeight="40px">
          <Button
            className="btn--secondary"
            component={Link}
            to="/login"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button className="btn--primary" onClick={onSubmitPasswordRecovery} type="submit" variant="contained">
            Enviar
          </Button> {/* Botões para cancelar e enviar a solicitação de recuperação de senha */}
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}