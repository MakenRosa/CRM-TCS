import React, { useState } from 'react';
import '../../resetPassword.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from 'utils';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const navigate = useNavigate();
    
    const  handleResetPassword = async () => {
      if (password === confirmPassword) {
        const data = {
          uid : queryParameters.get("uid"),
          token : queryParameters.get("token"),
          new_password : password,
        };
        await resetPassword(data);
        //fazer try catch pro negocio ficar bala
        setMessage('Senha redefinida com sucesso!');
        navigate("/login");

      } else {
        setMessage('As senhas não coincidem. Tente novamente.');
      }
    };
  
    return (
      <div className="reset-password-container">
        <h2>Redefinir Senha</h2>
        <input
          type="password"
          placeholder="Nova Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Nova Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Redefinir Senha</button>
        <p className="message">{message}</p>
      </div>
    );
  };
  
  export default ResetPassword;