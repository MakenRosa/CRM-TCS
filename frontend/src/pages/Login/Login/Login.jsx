import { AccountCircle, Lock } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Button, Form, TextField } from "components"
import { Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SectionLogin, StyledLinks } from "pages"
import { loginUser } from "utils"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isLogged] = useState(!!sessionStorage.getItem("token"))
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])
  
  const onSubmit = e => {
    e.preventDefault()
    const user = {
      email,
      senha
    }
    loginUser(user)
    .then(res => {
        sessionStorage.setItem("token", res.data.access_token)
        setEmail("")
        setSenha("")
    })
    .then(() => navigate('/dashboard'))
    .catch(() => {
        sessionStorage.removeItem("token")
    })
  }

  return (
    <SectionLogin h="60%" title="Login">
      <Form>
        <TextField
          fullWidth
          icon={<AccountCircle />}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
          position="start"
          size="small"
          type="email"
          value={email}
          variant="filled"
        />
        <TextField
          fullWidth
          icon={<Lock />}
          onChange={e => setSenha(e.target.value)}
          placeholder="Senha"
          position="start"
          size="small"
          type="password"
          value={senha}
          variant="filled"
        />
        <StyledLinks>
          <Link
            color="#430331"
            fontSize={14}
            fontWeight={700}
            href="/register"
            underline="none"
          >
            Primeiro acesso?
          </Link>
          <Link
            color="#8a8086"
            fontSize={13}
            href="/forgot-password"
            marginTop="-10px"
          >
            Esqueceu a senha?
          </Link>
        </StyledLinks>
        <Button className="btn--primary" onClick={onSubmit} type="submit" variant="contained">
          Login
        </Button>
      </Form>
    </SectionLogin>
  )
}

