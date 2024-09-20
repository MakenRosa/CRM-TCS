import { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, TextField, Select, MenuItem } from '@mui/material'
import { createPropostaPerdido } from 'utils'
import { toast } from 'react-toastify'
import { ModalContent, StyledButton, StyledModal } from './DefinirPerdaModal.styles'

export const DefinirPerdaModal = ({ proposta, open, handleClose }) => {
  const [dataFechamento, setDataFechamento] = useState('')
  const [statusProposta, setStatusProposta] = useState('')
  const [motivo, setMotivo] = useState('')

  const user_id = sessionStorage.getItem('user_id')

  const handleSave = () => {
    const lostProposta = async () => {
      try {
        const data = {
          status_proposta: statusProposta,
          data_fechamento: dataFechamento.split('-').reverse().join('-'),
          motivo,
          proposta: proposta.id
        }
        await createPropostaPerdido(data, user_id)
        toast.success('Perda definida')
      }
      catch (error) {
        toast.error('Erro ao definir perda')
      }
    }
    lostProposta()
    handleClose()
  }

  return (
    <StyledModal onClose={handleClose} open={open}>
      <ModalContent>
        <Typography variant="h6">Definir Perda</Typography>
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
          <MenuItem value="concluida">Perdida</MenuItem>
        </Select>
        <Select
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={e => setMotivo(e.target.value)}
          sx={{ marginTop: '20px', width: '100%' }}
          value={motivo}
        >
          <MenuItem disabled value="">
            Motivo
          </MenuItem>
          <MenuItem value="preco">Preço</MenuItem>
          <MenuItem value="concorrencia">Concorrência</MenuItem>
          {/* Adicione mais opções de motivos aqui */}
        </Select>
        <StyledButton onClick={handleSave}>Salvar</StyledButton>
      </ModalContent>
    </StyledModal>
  )
}

DefinirPerdaModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  proposta: PropTypes.object
}