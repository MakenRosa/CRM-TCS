import { Check, Email, Lock } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, PasswordValidator, TextField } from "components"
import { useEffect, useState } from "react"
import { StyledLinks, SectionLogin } from "pages"
import { isValidForm, registerUser } from "utils"
import { CircularProgress } from "@mui/material"

export const Register = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const navigate = useNavigate()
  const [isLogged] = useState(!!sessionStorage.getItem("token"))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true) 
    const user = {
      email,
      senha,
      confirmSenha
    }
    if (!isValidForm(user)) {
      setLoading(false)
      return
    }
    registerUser(user)
    .then(() => {
      setEmail("")
      setSenha("")
      setConfirmSenha("")
      navigate('/login')
    })
    .catch(() => {
        sessionStorage.removeItem("token")
        navigate('/login')
    })
    .finally(() => setLoading(false))
  }
  
  return (
    <SectionLogin h="70%" title="Cadastro">
      <Form>
        <TextField
          fullWidth
          icon={<Email />}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
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
        <TextField
          fullWidth
          icon={<Check />}
          onChange={e => setConfirmSenha(e.target.value)}
          placeholder="Confirme a Senha"
          position="start"
          size="small"
          type="password"
          value={confirmSenha}
          variant="filled"
        />
        <PasswordValidator password={senha} />
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
          <Button className="btn--primary" onClick={onSubmit} type="submit" variant="contained">
            {loading ? <CircularProgress color="inherit" size={24} /> : "Cadastrar"}
          </Button>
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}
