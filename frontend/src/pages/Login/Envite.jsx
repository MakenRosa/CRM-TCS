import React, { useState } from 'react';
import '../../app.css';

const Invite = () => {
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    // Aqui você pode implementar a lógica para enviar o convite por email
    console.log('Convite enviado para:', email);
  };

  return (
    <div className="invite-container">
      <h2>Convidar Usuário</h2>
      <p>Insira o e-mail para convidar:</p>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleInvite}>Confirmar</button>
    </div>
  );
};

export default Invite;
