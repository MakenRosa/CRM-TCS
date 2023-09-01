import { useState } from 'react'
import { Button, TextField } from 'components'
import { Email } from '@mui/icons-material'
import { StyledModalBox, StyledModal } from '.'

export const Invite = () => {  
  const [open, setOpen] = useState(false)

  const handleSendInvite = () => {
    console.log('enviar convite')
  }

  return (
    <>
      <StyledModal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={() => setOpen(false)}
        open={open}
      >
        <StyledModalBox>
          <h1>SOLVE CRM</h1>
          <p>Insira o e-mail para convidar:</p>
          <TextField fullWidth={false} icon={<Email />} placeholder="E-mail" type="email" />
          <Button onClick={handleSendInvite}
            variant="primary" 
          >Enviar convite
          </Button>
        </StyledModalBox>
      </StyledModal>
      <Button onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
    </>
  )
}