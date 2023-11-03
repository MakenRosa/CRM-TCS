import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from 'components' // Ou de onde você importa seus componentes
import { Box, Radio, Typography, styled } from '@mui/material'
import { Group, MailOutline, Phone, Send } from '@mui/icons-material'

const ModalContainer = styled(Box)`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  overflow: auto;
  padding: 20px;
`

const ModalContent = styled(Box)`
  width: 500px;
  padding: 20px;
  background-color: #FFF;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

const ModalTitle = styled(Typography)`
  color: #5038ED;
  font-size: 26px;
  margin-bottom: 20px;
`

const IconContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 8px;
  width: fit-content;
  border: 1px solid #746F6F;
  padding: 5px;
`

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const StyledRadio = styled(Radio)`
  &.Mui-checked {
    color: #746F6F;
    background-color: #EDEBFD;
    border-radius: 8px;
  }
`

const formatDate = dateStr => {
  if (!dateStr) { return "" }
  const [day, month, year] = dateStr.split("/")
  return `${ year }-${ month }-${ day }`
}

export const TaskModal = ({ open, onClose, setSelectedTarefa, task = null }) => {  
  const [selectedValue, setSelectedValue] = useState( task?.tipo ? task.tipo : 'Ligação')
  const [data, setData] = useState({})

  useEffect(() => {
    if (task) {
      setData({
        contato: task.contato,
        data: formatDate(task.data),
        hora: task.hora,
        membroEquipe: task.membroEquipe,
        nomeNegocio: task.negocio,
        responsavel: task.responsavel,
        mensagem: task.mensagem
      })
    }
  }, [task])


  if (!open) { return null }

  const handleRadioChange = event => {
    setSelectedValue(event.target.value)
  }

  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    setSelectedTarefa(null)
    setData({
      contato: '',
      data: '',
      hora: '',
      membroEquipe: '',
      nomeNegocio: '',
      responsavel: '',
      mensagem: ''
    })
    onClose()
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalTitle align="center" variant="h3">Nova Tarefa</ModalTitle>

        <Box alignItems="center" display="flex" flexDirection="column" >
          <Box display="flex" flexDirection="row" gap="10px" justifyContent="space-between" width="100%">
            <IconContainer>
              <Box display="flex" justifyContent="center">
                <label>
                  <StyledRadio
                    checked={selectedValue === 'Ligação'}
                    checkedIcon={<Phone />}
                    icon={<Phone />}
                    onChange={handleRadioChange}
                    value="phone"
                  />
                </label>
                <label>
                  <StyledRadio
                    checked={selectedValue === 'Mensagem'}
                    checkedIcon={<Send />}
                    icon={<Send />}
                    onChange={handleRadioChange}
                    value="send"
                  />
                </label>
                <label>
                  <StyledRadio
                    checked={selectedValue === 'Reunião'}
                    checkedIcon={<Group />}
                    icon={<Group />}
                    onChange={handleRadioChange}
                    value="group"
                  />
                </label>
                <label>
                  <StyledRadio
                    checked={selectedValue === 'E-mail'}
                    checkedIcon={<MailOutline />}
                    icon={<MailOutline />}
                    onChange={handleRadioChange}
                    value="mail"
                  />
                </label>
              </Box>
            </IconContainer>
            <StyledTextField
              name="mensagem"
              onChange={handleChange}
              placeholder="Mensagem"
              value={data.mensagem}
            />
          </Box>

          <Box display="flex" flexDirection="row" gap="10px" justifyContent="space-between" width="100%">
            <StyledTextField name="data" onChange={handleChange} placeholder="Data" type="date" value={data.data} />
            <Box display="flex" flexDirection="row" gap="10px" justifyContent="space-between" marginLeft={1} width="100%" >
              <Typography
                alignItems="center"
                display="flex"
                fontWeight="600"
                variant="p"
              >Hora
              </Typography>
              <StyledTextField name="hora" onChange={handleChange} placeholder="Hora" type="time" value={data.hora} />
            </Box>
          </Box>
        </Box>
        <StyledTextField disabled name="membroEquipe" onChange={handleChange} placeholder="Membro equipe" value={data.membroEquipe} />
        <StyledTextField disabled name="nomeNegocio" onChange={handleChange} placeholder="Nome de Negócio" value={data.nomeNegocio} />
        <StyledTextField disabled name="responsavel" onChange={handleChange} placeholder="Responsável (Lead)" value={data.responsavel} />

        <ButtonContainer>
          <Button onClick={handleClose} variant="secondary">Cancelar</Button>
          <Button variant="primary">Salvar</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  )
}

TaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setSelectedTarefa: PropTypes.func,
  task: PropTypes.object
}