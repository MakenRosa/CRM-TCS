import React, { useState } from 'react'
import '../../resetPassword.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetConfirmPassword, validateConfirmPassword, validatePassword } from 'utils'
import { Button, Form, PasswordValidator, TextField } from 'components'
import { CircularProgress } from '@mui/material'

export const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const navigate = useNavigate()
    
    const  handleResetPassword = async e => {
      e.preventDefault()
      if (validatePassword(password) && validateConfirmPassword(password, confirmPassword)) {
        const data = {
          uid: queryParameters.get("uid"),
          token: queryParameters.get("token"),
          new_password: password
        }
        setLoading(true)
        await resetConfirmPassword(data)
        .then(() => {
          navigate('/login')
        })
        .catch(() => {
          sessionStorage.removeItem("access")
          sessionStorage.removeItem("refresh")
          setPassword("")
          setConfirmPassword("")
        })
        .finally(() => setLoading(false))
      }
    }

  
    return (
      <div className="reset-password-container">
        <h2>Redefinir Senha</h2>
        <Form>
          <TextField
            onChange={e => setPassword(e.target.value)}
            placeholder="Nova Senha"
            type="password"
            value={password}
          />
          <TextField
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Nova Senha"
            type="password"
            value={confirmPassword}
          />
          <PasswordValidator password={password} />
          <Button
            className="btn--primary"
            disabled={loading}
            onClick={handleResetPassword}
          >{loading ? <CircularProgress size={20} /> : "Redefinir Senha"}
          </Button>
        </Form>
      </div>
    )
  }