import { Button, Form, TextField } from "components"
import { Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { StyledLinks, SectionLogin } from "pages"
import { useEffect, useState } from "react"
import { resetPassword, verifyToken } from "utils"
import { toast } from "react-toastify"
import { CircularProgress } from "@mui/material"

export const ForgotPassword = () => {
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

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

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
    <SectionLogin h="40%" title="Recuperar Senha">
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
        /> 
        <StyledLinks maxHeight="40px">
          <Button
            component={Link}
            disabled={loading}
            to="/login"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button disabled={loading} onClick={onSubmitPasswordRecovery} type="submit" variant="primary">
            {loading ? <CircularProgress color="inherit" size={24} /> : "Enviar"}
          </Button> 
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}