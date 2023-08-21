import { Check, Email, Lock } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, PasswordValidator, TextField } from "components"
import { useEffect, useState } from "react"
import { StyledLinks, SectionLogin } from "pages"
import { isValidForm, registerUser } from "utils"

export const Register = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const navigate = useNavigate()
  const [isLogged] = useState(!!sessionStorage.getItem("token"))

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  const onSubmit = e => {
    e.preventDefault()
    const user = {
      email,
      senha,
      confirmSenha
    }
    if (!isValidForm(user)) {
      return
    }
    registerUser(user)
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
