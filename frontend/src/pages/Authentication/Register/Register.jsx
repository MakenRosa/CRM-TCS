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

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  /**
   * Handles form submission for user registration.
   * @param {Event} e - The event object representing the form submission.
   */
  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const user = {
      email,
      password: senha,
      re_password: confirmSenha
    }

    try {
      if (!isValidForm(user)) {
        setLoading(false)
        return
      }

      await registerUser(user)
      navigate('/login')
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
