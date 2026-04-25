/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'components' 
import { Box, Typography } from '@mui/material'
import { Group, MailOutline, Phone, Send } from '@mui/icons-material'
import { createTarefa, updateTarefa } from 'utils'
import { toast } from 'react-toastify'
import { ButtonContainer, IconContainer, ModalContainer, ModalContent, ModalTitle, StyledRadio, StyledTextField } from './TarefaModal.styles'

export const TarefaModal = ({ open, onClose, setSelectedTarefa, task = null, proposta, lead_responsavel, nome_negocio, setTarefas }) => {  
  const [selectedValue, setSelectedValue] = useState(task?.tipo_contato || 'Ligação')
  const [data, setData] = useState({})

  const resetForm = () => {
    setSelectedValue('Ligação')
    setData({
      tipo_contato: 'Ligação',
      data_cadastro: '',
      hora_cadastrado: '',
      membro_equipe: sessionStorage.getItem('username'),
      nome_negocio,
      responsavel_negocio: lead_responsavel
    })
  }

  useEffect(() => {
    if (task) {
      setSelectedValue(task.tipo_contato)
      setData({
        tipo_contato: task.tipo_contato,
        data_cadastro: task.data_cadastro,
        hora_cadastrado: task.hora_cadastrado,
        membro_equipe: task.membro_equipe,
        nome_negocio: task.nome_negocio,
        responsavel_negocio: task.responsavel_negocio
      })
    } else {
      resetForm()
    }
  }, [task])


  if (!open) { return null }

  const handleRadioChange = event => {
    const novoTipoContato = event.target.value
    setSelectedValue(novoTipoContato)
    setData(prevData => ({ ...prevData, tipo_contato: novoTipoContato }))
  }
  

  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    setSelectedTarefa(null)
    resetForm()
    onClose()
  }

  const handleSave = () => {
    const formattedDate = formatDate(data.data_cadastro)
    if (task) {
      const saveTarefa = async () => {
          try {
            await updateTarefa(task.id, {
              ...data,
              data_cadastro: formattedDate,
              proposta: proposta.id,
              tipo_contato: selectedValue
            })
            setTarefas(prevState => prevState.map(t => (t.id === task.id ? { ...t, ...data, data_cadastro: formattedDate.split('-').reverse().join('-') } : t)))
            toast.success('Tarefa atualizada com sucesso')
          } catch (error) {
            toast.error('Erro ao atualizar tarefa')
          }
      }    
      saveTarefa()    
    } else {
      if (!isDataHoraValida(formattedDate, data.hora_cadastrado)) {
        return
      }
      const saveTarefa = async () => {
        try {
          console.log(formattedDate)
          const response = await createTarefa({
            ...data,
            data_cadastro: formattedDate,
            proposta: proposta.id,
            tipo_contato: selectedValue,
            concluida: false
          })
          resetForm()
          setTarefas(prevState => [...prevState, { ...data, id: response.data.data.tarefa.id }])
          toast.success('Tarefa criada com sucesso')
        } catch (error) {
          toast.error('Erro ao criar tarefa')
        }
      }
      saveTarefa()
    }
    handleClose()
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalTitle align="center" variant="h3">
          {task ? 'Editar tarefa' : 'Nova tarefa'}
        </ModalTitle>
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
                    value="Ligação"
                  />
                </label>
                <label>
                  <StyledRadio
                    checked={selectedValue === 'Mensagem'}
                    checkedIcon={<Send />}
                    icon={<Send />}
                    onChange={handleRadioChange}
                    value="Mensagem"
                  />
                </label>
                <label>
                  <StyledRadio
                    checked={selectedValue === 'Reunião'}
                    checkedIcon={<Group />}
                    icon={<Group />}
                    onChange={handleRadioChange}
                    value="Reunião"
                  />
                </label>
                <label>
                  <StyledRadio
                    checked={selectedValue === 'E-mail'}
                    checkedIcon={<MailOutline />}
                    icon={<MailOutline />}
                    onChange={handleRadioChange}
                    value="E-mail"
                  />
                </label>
              </Box>
            </IconContainer>
            <StyledTextField
              disabled
              name="contato"
              onChange={handleChange}
              value={selectedValue}
            />
          </Box>

          <Box display="flex" flexDirection="row" gap="10px" justifyContent="space-between" width="100%">
            <StyledTextField name="data_cadastro" onChange={handleChange} placeholder="Data" type="date" value={data.data_cadastro} />
            <Box display="flex" flexDirection="row" gap="10px" justifyContent="space-between" marginLeft={1} width="100%" >
              <Typography
                alignItems="center"
                display="flex"
                fontWeight="600"
                variant="p"
              >Hora
              </Typography>
              <StyledTextField name="hora_cadastrado" onChange={handleChange} placeholder="Hora" type="time" value={data.hora_cadastrado} />
            </Box>
          </Box>
        </Box>
        <StyledTextField disabled name="membro_equipe" onChange={handleChange} placeholder="Membro equipe" value={data.membro_equipe} />
        <StyledTextField disabled name="nome_negocio" onChange={handleChange} placeholder="Nome do Negócio" value={data.nome_negocio} />
        <StyledTextField disabled name="responsavel_negocio" onChange={handleChange} placeholder="Responsável (Lead)" value={data.responsavel_negocio} />

        <ButtonContainer>
          <Button onClick={handleClose} variant="secondary">Cancelar</Button>
          <Button onClick={handleSave} variant="primary">Salvar</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  )
}

const isDataHoraValida = (data_cadastro, hora_cadastrado) => {
  if (!data_cadastro) {
    toast.error('Data é obrigatória.')
    return false
  }
  if (!hora_cadastrado) {
    toast.error('Hora é obrigatória.')
    return false
  }
  return true
}

TarefaModal.propTypes = {
  lead_responsavel: PropTypes.string,
  nome_negocio: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  proposta: PropTypes.object,
  setSelectedTarefa: PropTypes.func,
  setTarefas: PropTypes.func,
  task: PropTypes.object
}

const formatDate = dateStr => {
  if (!dateStr) { return '' }

  const dateParts = dateStr.split('-').map(part => parseInt(part, 10))
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${ day }-${ month }-${ year }`
}
