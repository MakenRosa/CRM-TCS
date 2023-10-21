import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetConfirmPassword, validateConfirmPassword, validatePassword } from 'utils'
import { Button, Form, PasswordValidator, TextField } from 'components'
import { CircularProgress } from '@mui/material'
import { SectionLogin } from 'pages'
import { Check, Lock } from '@mui/icons-material'

export const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const navigate = useNavigate()
    
    const handleResetPassword = async event => {
      event.preventDefault()

      if (validatePassword(password) && validateConfirmPassword(password, confirmPassword)) {
        const data = {
          uid: queryParameters.get("uid"),
          token: queryParameters.get("token"),
          new_password: password
        }

        setLoading(true)
        try {
          await resetConfirmPassword(data)
          toast.success("Senha redefinida com sucesso!")
          navigate('/login')
        } catch (error) {
          sessionStorage.removeItem("access")
          sessionStorage.removeItem("refresh")
          toast.error("Erro ao redefinir senha!")
          setPassword("")
          setConfirmPassword("")
        } finally {
          setLoading(false)
        }
      }
    }

    return (
      <SectionLogin h="50%" title="Redefinir Senha">
        <Form>
          <TextField
            icon={<Lock />}
            onChange={e => setPassword(e.target.value)}
            placeholder="Nova Senha"
            type="password"
            value={password}
          />
          <TextField
            icon={<Check />}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Nova Senha"
            type="password"
            value={confirmPassword}
          />
          <PasswordValidator password={password} />
          <Button
            disabled={loading}
            onClick={handleResetPassword}
            variant="primary"
          >{loading ? <CircularProgress size={20} /> : "Redefinir Senha"}
          </Button>
        </Form>
      </SectionLogin>
    )
  }