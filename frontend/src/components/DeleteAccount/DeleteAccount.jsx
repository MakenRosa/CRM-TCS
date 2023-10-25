import { Button, TextField, StyledModalBox, StyledModal } from 'components'
import PropTypes from 'prop-types'
import { Lock } from '@mui/icons-material'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import { deleteUser, logoutUser } from 'utils'


export const DeleteAccount = ({ open, onClose }) => {  
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const currentId = sessionStorage.getItem('user_id')

  const handleOnClose = () => {
    setPassword('')
    onClose()
  }

  const handleDeleteAccount = async () => {
    if (password) {
      try {
        setLoading(true)
        await deleteUser({ id: currentId, "current_password": password })
        toast.success('Conta deletada com sucesso!')
        handleOnClose()
        logoutUser()
      } catch (err) {
        toast.error("Erro ao deletar conta.")
      } finally {
        setLoading(false)
      }
    } else {
      toast.error('Por favor, insira sua senha.')
    }
  }

  return (
    <StyledModal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={handleOnClose}
      open={open}
    >
      <StyledModalBox>
        <h1>Confirmar Exclusão</h1>
        <p>Insira sua senha para deletar sua conta:</p>
        <TextField fullWidth={false} icon={<Lock />} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" value={password} />
        <Button 
          disabled={loading}
          onClick={handleDeleteAccount}
          type="submit"
          variant="primary"
        >{
          loading ? 
            <CircularProgress color="inherit" size={24} /> :
            'Deletar Conta'
        }
        </Button>
      </StyledModalBox>
    </StyledModal>
  )
}

DeleteAccount.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}
