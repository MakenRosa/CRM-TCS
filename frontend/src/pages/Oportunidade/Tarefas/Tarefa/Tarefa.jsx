/* eslint-disable no-magic-numbers */
import PropTypes from "prop-types"
import { GroupsOutlined, MailOutline, PhoneOutlined, RadioButtonChecked, RadioButtonUnchecked, Telegram } from "@mui/icons-material"
import { Box, Card, Checkbox, Typography, styled } from "@mui/material"

const TarefaCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 96px;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;
  border: 1px solid #8F8B8B;
  box-shadow: none;
  border-radius: 16px;
  overflow: visible;  
`

const TarefaHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: 20px;
  margin-top: -20px;
  margin-right: -15px;
`  

const CircleIcon = styled(Box)`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #D9D9D9;
  color: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  position: absolute;
  left: -40px;
  top: 35%;
  z-index: 10;
`


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
          <CircleIcon>{tarefa.tipo === "Ligação" ? <PhoneOutlined sx={{ color: "gray" }} /> :
        tarefa.tipo === "Mensagem" ? <Telegram sx={{ color: "gray" }} /> :
        tarefa.tipo === "E-mail" ? <MailOutline sx={{ color: "gray" }} /> :
        tarefa.tipo === "Reunião" ? <GroupsOutlined sx={{ color: "gray" }} /> : null}
          </CircleIcon>
          <TarefaHeader>
            <Typography component="div" sx={{ flexGrow: 1, marginLeft: "20px" }} variant="h5">
              {tarefa.titulo}
            </Typography>
            { tarefa.status !== "Concluida" &&
            <StyledCheckbox checked={isSelected} checkedIcon={<RadioButtonChecked />} icon={<RadioButtonUnchecked />} onChange={handleSelect} size="small" />
        }
          </TarefaHeader>
          <Box display="flex" flexDirection="row" fontSize="12px" justifyContent="space-between" marginX="40px">
            <Typography color={ new Date(tarefa.data) < new Date() ? "green" : "red" }
              sx={{ fontWeight: "600" }}
              variant="body1"
            >{tarefa.data}
            </Typography>
            <Typography variant="body1">{tarefa.negocio}</Typography>
            <Typography variant="body1">{tarefa.responsavel}</Typography>
            <Typography variant="body1">{tarefa.consultor}</Typography>
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