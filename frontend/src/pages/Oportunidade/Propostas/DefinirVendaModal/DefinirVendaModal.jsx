import { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, TextField, Select, MenuItem } from '@mui/material'
import { createPropostaVenda } from 'utils'
import { toast } from 'react-toastify'
import { ModalContent, StyledButton, StyledModal } from './DefinirVendaModal.styles'

export const DefinirVendaModal = ({ proposta, open, handleClose }) => {
  const [dataFechamento, setDataFechamento] = useState('')
  const [statusProposta, setStatusProposta] = useState('')


  const handleSave = () => {
    const sellProposta = async () => {
      try {
        const data = {
          status_proposta: statusProposta,
          proposta: proposta.id
        }
        await createPropostaVenda(data)
        toast.success('Venda concluída')
      }
      catch (error) {
        toast.error('Erro ao definir venda')
      }
    }
    sellProposta()
    handleClose()
  }

  return (
    <StyledModal onClose={handleClose} open={open}>
      <ModalContent>
        <Typography variant="h6">Definir Venda</Typography>
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          label="Data Fechamento"
          onChange={e => setDataFechamento(e.target.value)}
          sx={{ marginTop: '20px' }}
          type="date"
          value={dataFechamento}
        />
        <Select
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={e => setStatusProposta(e.target.value)}
          sx={{ marginTop: '20px', width: '100%' }}
          value={statusProposta}
        >
          <MenuItem disabled value="">
            Status Proposta
          </MenuItem>
          <MenuItem value="concluida">Venda concluída</MenuItem>
        </Select>
        <StyledButton onClick={handleSave}>Salvar</StyledButton>
      </ModalContent>
    </StyledModal>
  )
}

DefinirVendaModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  proposta: PropTypes.object.isRequired
}
