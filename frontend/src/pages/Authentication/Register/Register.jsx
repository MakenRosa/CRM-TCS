import { AccountCircle, Check, Email, Lock } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, PasswordValidator, TextField } from "components"
import { useEffect, useState } from "react"
import { StyledLinks, SectionLogin } from "pages"
import { isValidForm, registerUser, verifyToken } from "utils"
import { CircularProgress } from "@mui/material"

export const Register = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState()
  const [loading, setLoading] = useState(false)
  const [group, setGroup] = useState("novo_grupo")


  useEffect(() => {
    const initialVerify = async () => {
      setIsLogged(await verifyToken())
    }
    initialVerify()
    const urlParams = new URLSearchParams(window.location.search)
    const grupo = urlParams.get('cd_grupo')
    if (grupo) {
      setGroup(grupo)
    }
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
      first_name: nome.split(' ')[0],
      last_name: nome.split(' ').slice(1).join(' '),
      email,
      password: senha,
      re_password: confirmSenha,
      nm_grupo: group
    }

    try {
      if (isValidForm(user, false)) {
        await registerUser(user)
        navigate('/login')
      }
    } catch (error) {
      sessionStorage.removeItem('access')
      sessionStorage.removeItem('refresh')
      setSenha('')
      setConfirmSenha('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionLogin title="Cadastro">
      <Form>
        <TextField fullWidth icon={<AccountCircle />} onChange={e => setNome(e.target.value)} placeholder="Nome" position="start" size="small" type="text" value={nome} variant="filled" />
        <TextField fullWidth icon={<Email />} onChange={e => setEmail(e.target.value)} placeholder="Email" position="start" size="small" type="email" value={email} variant="filled" />
        <TextField fullWidth icon={<Lock />} onChange={e => setSenha(e.target.value)} placeholder="Senha" position="start" size="small" type="password" value={senha} variant="filled" />
        <TextField fullWidth icon={<Check />} onChange={e => setConfirmSenha(e.target.value)} placeholder="Confirme a Senha" position="start" size="small" type="password" value={confirmSenha} variant="filled" />
        
        <PasswordValidator password={senha} />
        
        <StyledLinks maxHeight="40px">
          <Button component={Link} disabled={loading} to="/login" variant="outlined">Cancelar</Button>
          <Button disabled={loading} onClick={onSubmit} type="submit" variant="primary">{loading ? <CircularProgress color="inherit" size={24} /> : "Cadastrar"}</Button>
        </StyledLinks>
      </Form>
    </SectionLogin>
  )
}
