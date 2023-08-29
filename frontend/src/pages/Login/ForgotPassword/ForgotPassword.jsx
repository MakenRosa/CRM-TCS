import { Button, Form, TextField } from "components"
import { Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { StyledLinks, SectionLogin } from "pages"
import { useEffect, useState } from "react"
import { resetPassword, verifyToken } from "utils"
import { toast } from "react-toastify"
import { CircularProgress } from "@mui/material"

export const ForgotPassword = () => {
  // Determina se o usuário está logado
  const [isLogged, setIsLogged] = useState()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    const user = {
      email
    }
    resetPassword(user)
      .then(() => {
        navigate('/login')
        toast.success("Um e-mail foi enviado para você com instruções para redefinir sua senha.")
      })
      .catch(() => {
        sessionStorage.removeItem("access")
        sessionStorage.removeItem("refresh")
        setEmail('')
      })
      .finally(() => setLoading(false))
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
            disabled={loading}
            to="/login"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button className="btn--primary" disabled={loading} onClick={onSubmitPasswordRecovery} type="submit" variant="contained">
            {loading ? <CircularProgress color="inherit" size={24} /> : "Enviar"}
          </Button> {/* Botões para cancelar e enviar a solicitação de recuperação de senha */}
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}