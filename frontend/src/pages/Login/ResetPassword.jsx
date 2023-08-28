import React, { useState } from 'react'
import '../../resetPassword.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetConfirmPassword } from 'utils'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const navigate = useNavigate()
    
    const  handleResetPassword = async () => {
      if (password === confirmPassword) {
        const data = {
          uid: queryParameters.get("uid"),
          token: queryParameters.get("token"),
          new_password: password
        }
        await resetConfirmPassword(data)
        // fazer try catch pro negocio ficar bala
        setMessage('Senha redefinida com sucesso!')
        navigate("/login")

      } else {
        setMessage('As senhas não coincidem. Tente novamente.')
      }
    }
  
    return (
      <div className="reset-password-container">
        <h2>Redefinir Senha</h2>
        <input
          onChange={e => setPassword(e.target.value)}
          placeholder="Nova Senha"
          type="password"
          value={password}
        />
        <input
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
        />
        <button onClick={handleResetPassword}>Redefinir Senha</button>
        <p className="message">{message}</p>
      </div>
    )
  }
  
  export default ResetPassword