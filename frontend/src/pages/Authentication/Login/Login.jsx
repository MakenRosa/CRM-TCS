import { toast } from "react-toastify"
import { AccountCircle, Lock } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Button, Form, TextField } from "components"
import { CircularProgress, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SectionLogin, StyledLinks } from "pages"
import { isValidForm, loginUser, verifyToken } from "utils"

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

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const user = {
      email,
      password: senha
    }

    try {
      if (isValidForm(user, true)) {
      const res = await loginUser(user)
      sessionStorage.setItem("access", res.data.access)
      sessionStorage.setItem("refresh", res.data.refresh)
      sessionStorage.setItem("user_id", res.data.user_id)
      sessionStorage.setItem("username", `${ res.data.first_name  } ${  res.data.last_name }`)
      setIsLogged(await verifyToken())
      toast.success("Login realizado com sucesso!")
      }
    } catch (error) {
      sessionStorage.removeItem("access")
      sessionStorage.removeItem("refresh")
      sessionStorage.removeItem("user_id")
      if (error.response.data.detail === "No active account found with the given credentials") {
        toast.error("E-mail ou senha incorretos!")
      } else {
        toast.error("Não foi possível realizar o login. Tente novamente mais tarde!")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionLogin h="40%" title="Login">
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
        <Button disabled={loading} onClick={onSubmit} type="submit" variant="primary">
          {loading ? <CircularProgress color="inherit" size={24} /> : "Login"} 
        </Button>
      </Form>
    </SectionLogin>
  )
}
