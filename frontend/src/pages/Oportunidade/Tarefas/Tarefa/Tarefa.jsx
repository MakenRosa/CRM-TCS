/* eslint-disable no-magic-numbers */
import PropTypes from "prop-types"
import { GroupsOutlined, MailOutline, PhoneOutlined, RadioButtonChecked, RadioButtonUnchecked, Telegram } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { CircleIcon, StyledCheckbox, TarefaCard, TarefaHeader } from "./Tarefa.styles"

const isPastDateTime = (data, hora) => {
  const dataHoraTarefa = new Date(`${ data }T${ hora }`)
  return dataHoraTarefa < new Date()
}

export const Tarefa = ({ tarefa, onSelect, setSelectedTarefa, selectedTarefa, marginBottom }) => {
  const isSelected = selectedTarefa && selectedTarefa.id === tarefa.id
  
  const handleSelect = () => {
    if (isSelected) {
      setSelectedTarefa(null)
    } else {
      onSelect()
    }
  }

    return (
      <Box display="flex" flexDirection="column" marginBottom={marginBottom}>
        <TarefaCard>
          <CircleIcon>{tarefa.tipo_contato === "Ligação" ? <PhoneOutlined sx={{ color: "gray" }} /> :
        tarefa.tipo_contato === "Mensagem" ? <Telegram sx={{ color: "gray" }} /> :
        tarefa.tipo_contato === "E-mail" ? <MailOutline sx={{ color: "gray" }} /> :
        tarefa.tipo_contato === "Reunião" ? <GroupsOutlined sx={{ color: "gray" }} /> : null}
          </CircleIcon>
          <TarefaHeader>
            <Typography component="div" sx={{ flexGrow: 1, marginLeft: "20px" }} variant="h5">
              {tarefa.tipo_contato}
            </Typography>
            { !tarefa.concluida &&
            <StyledCheckbox checked={isSelected} checkedIcon={<RadioButtonChecked />} icon={<RadioButtonUnchecked />} onChange={handleSelect} size="small" />
        }
          </TarefaHeader>
          <Box display="flex" flexDirection="row" fontSize="12px" justifyContent="space-between" marginX="40px">
            <Typography color={isPastDateTime(tarefa.data_cadastro, tarefa.hora_cadastrado) ? "red" : "green"}
              sx={{ fontWeight: "600" }}
              variant="body1"
            >{tarefa.data_cadastro.split("-").reverse().join("/")}
            </Typography>
            <Typography color={isPastDateTime(tarefa.data_cadastro, tarefa.hora_cadastrado) ? "red" : "green"}
              variant="body1"
            >{tarefa.hora_cadastrado.split(':').slice(0, 2).join(':')}
            </Typography>
            <Typography variant="body1">{tarefa.nome_negocio}</Typography>
            <Typography variant="body1">{tarefa.responsavel_negocio}</Typography>
            <Typography variant="body1">{tarefa.membro_equipe}</Typography>
          </Box>

        </TarefaCard>
      </Box>
  )
}

Tarefa.propTypes = {
  icon: PropTypes.object,
  marginBottom: PropTypes.string,
  onSelect: PropTypes.func,
  selectedTarefa: PropTypes.object,
  setSelectedTarefa: PropTypes.func,
  tarefa: PropTypes.object
}