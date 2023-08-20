import { Check, Email, Lock } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import Button from "components/Button/Button"
import Form from "components/Form/Form"
import { SectionLogin } from "./SectionLogin"
import { StyledLinks } from "./Login.styles"
import { TextField } from "components/TextField/TextField"
import axios from "axios"
import { useState } from "react"

export const Register = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const navigate = useNavigate()

  const onSubmit = e => {
    e.preventDefault()
    const user = {
      email,
      senha,
      confirmSenha
    }
    axios.post("http://localhost:8000/auth/register", user)
    .then(res => {
      setEmail("")
      setSenha("")
      setConfirmSenha("")
      if (res?.data?.message)
        {alert(res.data.message)}
      else
        {alert("Usuário cadastrado com sucesso")}
      navigate('/login')
    })
    .catch(err => {
      if (err?.response?.data?.message)
        {alert(err.response.data.message)}
      else
        {alert("Erro ao cadastrar usuário")}
    })
  }
  
  return (
    <SectionLogin title="Cadastro">
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
        <StyledLinks maxHeight="40px">
          <Button
            className="btn--secondary"
            component={Link}
            to="/login"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button className="btn--primary" onClick={onSubmit} type="submit" variant="contained">
            Cadastrar
          </Button>
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}
