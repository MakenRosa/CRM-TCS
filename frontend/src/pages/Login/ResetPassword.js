import React, { useState } from 'react';
import '../../resetPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleResetPassword = () => {
      if (password === confirmPassword) {
        // Aqui você pode implementar a lógica para redefinir a senha
        setMessage('Senha redefinida com sucesso!');
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