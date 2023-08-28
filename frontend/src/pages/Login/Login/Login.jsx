import { AccountCircle, Lock } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Button, Form, TextField } from "components"
import { CircularProgress, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SectionLogin, StyledLinks } from "pages"
import { loginUser, verifyToken } from "utils"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isLogged, setIsLogged] =  useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const initalVerify = async () => {
      setIsLogged(await verifyToken())
    }
    initalVerify()
  }, [])


  // Redirecionar para o dashboard se o usuário estiver logado
  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  // Função para lidar com o envio do formulário de login
  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    const user = {
      email,
      "password": senha
    }
    loginUser(user)
      .then(res => {
        sessionStorage.setItem("access", res.data.access)
        sessionStorage.setItem("refresh", res.data.refresh)
      })
      .then(async () => {
        setIsLogged(await verifyToken())
      })
      .catch(() => {
        sessionStorage.removeItem("access")
      })
      .finally(() => setLoading(false))
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
        /> {/* Campo de entrada de e-mail */}
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
        /> {/* Campo de entrada de senha */}
        <StyledLinks>
          <Link
            color="var(--tertiary-color)"
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
        <Button className="btn--primary" disabled={loading} onClick={onSubmit} type="submit" variant="contained">
          {loading ? <CircularProgress color="inherit" size={24} /> : "Login"} {/* Botão de login */}
        </Button>
      </Form>
    </SectionLogin>
  )
}
