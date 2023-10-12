import { Button, TextField } from 'components'
import { Email } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { sendGroupInvite, validateEmail } from 'utils'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { StyledModalBox, StyledModal } from '.'

export const Invite = ({ open, onClose }) => {  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const user_id = sessionStorage.getItem('user_id')

  const handleSendInvite = async () => {
    if (validateEmail(email)) {
      setLoading(true)
      try {
        await sendGroupInvite({ "to": email }, user_id)
        setEmail('')
        onClose()
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <StyledModal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={onClose}
      open={open}
    >
      <StyledModalBox>
        <h1>SOLVE CRM</h1>
        <p>Insira o e-mail para convidar:</p>
        <TextField fullWidth={false} icon={<Email />} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" value={email} />
        <Button 
          disabled={loading}
          onClick={handleSendInvite}
          variant="primary"
        >{
          loading ? 
            <CircularProgress color="inherit" size={24} /> :
            'Enviar convite'
        }
        </Button>
      </StyledModalBox>
    </StyledModal>
  )
}

Invite.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}