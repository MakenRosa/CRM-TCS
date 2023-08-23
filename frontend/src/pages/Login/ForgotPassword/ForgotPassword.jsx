import { Button, Form, TextField } from "components"
import { Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { StyledLinks, SectionLogin } from "pages"
import { useEffect, useState } from "react"

export const ForgotPassword = () => {
  // Determina se o usuário está logado
  const [isLogged] = useState(!!sessionStorage.getItem("token"))
  const navigate = useNavigate()

  // Se logado, redireciona para o dashboard
  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  return (
    <SectionLogin h="50%" title="Recuperar Senha">
      <p>Informe seu e-mail para receber instruções sobre como redefinir sua senha.</p>
      <Form>
        <TextField
          fullWidth
          icon={<Email />}
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
          <Button className="btn--primary" type="submit" variant="contained">
            Enviar
          </Button> {/* Botões para cancelar e enviar a solicitação de recuperação de senha */}
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}
