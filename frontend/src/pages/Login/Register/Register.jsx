import { Check, Email, Lock } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, PasswordValidator, TextField } from "components"
import { useEffect, useState } from "react"
import { StyledLinks, SectionLogin } from "pages"
import { isValidForm, registerUser, verifyToken } from "utils"
import { CircularProgress } from "@mui/material"

export const Register = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initialVerify = async () => {
      setIsLogged(await verifyToken())
    }
    initialVerify()
  }, [])

  // Redirecionar para o dashboard se o usuário estiver logado
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
      "password": senha,
      "re_password": confirmSenha
    }
    // Validar o formulário antes de prosseguir
    if (!isValidForm(user)) {
      console.log(user)
      console.log("Formulário inválido")
      setLoading(false)
      return
    }
    console.log("Formulário válido")
    registerUser(user)
    .then(() => {
      // Limpar os campos e redirecionar para a página de login após o registro
      setEmail("")
      setSenha("")
      setConfirmSenha("")
      navigate('/login')
    })
    .catch(() => {
        sessionStorage.removeItem("access")
        navigate('/login')
    })
    .finally(() => setLoading(false))
  }

  return (
    <SectionLogin h="70%" title="Cadastro">
      <Form>
        {/* Campos de entrada para e-mail, senha e confirmação de senha */}
        <TextField fullWidth icon={<Email />} onChange={e => setEmail(e.target.value)} placeholder="Email" position="start" size="small" type="email" value={email} variant="filled" />
        <TextField fullWidth icon={<Lock />} onChange={e => setSenha(e.target.value)} placeholder="Senha" position="start" size="small" type="password" value={senha} variant="filled" />
        <TextField fullWidth icon={<Check />} onChange={e => setConfirmSenha(e.target.value)} placeholder="Confirme a Senha" position="start" size="small" type="password" value={confirmSenha} variant="filled" />
        
        <PasswordValidator password={senha} /> {/* Validador de senha */}
        
        <StyledLinks maxHeight="40px">
          {/* Botões de cancelar e cadastrar */}
          <Button className="btn--secondary" component={Link} disabled={loading} to="/login" variant="outlined">Cancelar</Button>
          <Button className="btn--primary" onClick={onSubmit} type="submit" variant="contained">{loading ? <CircularProgress color="inherit" size={24} /> : "Cadastrar"}</Button>
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}
