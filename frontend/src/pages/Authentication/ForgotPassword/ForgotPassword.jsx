import { toast } from "react-toastify"
import { Button, Form, TextField } from "components"
import { Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { StyledLinks, SectionLogin } from "pages"
import { useEffect, useState } from "react"
import { resetPassword, verifyToken } from "utils"
import { CircularProgress, Typography, styled } from "@mui/material"

const ResponsiveForm = styled(Form)(({ theme }) => ({
  width: '100%', 
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px' 
  }
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: '20px',
  textAlign: 'center'
}))


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

  const onSubmitPasswordRecovery = async event => {
    event.preventDefault()
    setLoading(true)
    const user = {
      email
    }
    try {
      await resetPassword(user)
      toast.success("Um e-mail foi enviado para você com o link para redefinir sua senha!")
      navigate('/login')
    } catch (error) {
      sessionStorage.removeItem("access")
      sessionStorage.removeItem("refresh")
      sessionStorage.removeItem("user_id")
      toast.error("Erro ao enviar e-mail!")
      setEmail('')
    } finally {
      setLoading(false)
    }
    }
      
  return (
    <SectionLogin h="40%" title="Recuperar Senha">
      <StyledTypography>Informe seu e-mail para receber instruções sobre como redefinir sua senha.</StyledTypography>
      <ResponsiveForm onSubmit={onSubmitPasswordRecovery}>
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
      </ResponsiveForm>
    </SectionLogin>
  )
}