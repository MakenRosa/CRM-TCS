import { Box, Divider, Typography, styled } from "@mui/material"
import { Button, TaskModal } from "components"
import { useState } from "react"
import { toast } from "react-toastify"
import data from "./data.json"
import { Tarefa } from "./Tarefa"

const StyledButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 10px;
`

const StyledButtonsGroup = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 30px;
`

const StyledButton = styled(Button)`
  min-width: 120px;
`

const TarefaContainer = styled(Box)`
  position: relative;
`

const StyledFlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: auto;
  position: relative;
`

const StyledStatus = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #EDEBFD;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 0px 10px 10px 0px;
  margin-left: -20px;
`

const groupedTarefas = data.tarefas.reduce((acc, currentTarefa) => {
  acc[currentTarefa.status] = [...(acc[currentTarefa.status] || []), currentTarefa]
  return acc
}, {})

export const Tarefas = () => {
  const [open, setOpen] = useState(false)
  const [selectedTarefa, setSelectedTarefa] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }
  
  const handleEdit = () => {
    if (selectedTarefa) {
      handleOpen()
    } else {
      toast.warning("Selecione uma tarefa para editar")
    }
  }

  return (
    <Box display={"flex"} flexDirection={"column"} margin={"10px"} minHeight={"500px"} width={1}>
      <StyledButtons>
        <StyledButtonsGroup>
          <StyledButton variant={"primary"}>Concluir</StyledButton>
          <StyledButton onClick={handleEdit} variant={"secondary"}>Editar</StyledButton>
          <StyledButton onClick={handleOpen} variant={"primary"}>Nova Tarefa</StyledButton>
        </StyledButtonsGroup>
      </StyledButtons>
      <Box height={"100%"} position="relative" sx={{ overflowY: "scroll" }} width={1}>
        <StyledFlexBox>
          <Divider flexItem height={"100%"} orientation="vertical" sx={{ paddingLeft: "20px" }} />
          <Box marginLeft="20px" paddingRight="20px" width={1}>
            {Object.entries(groupedTarefas).map(([status, tarefas]) => (
              <Box key={status}>
                <StyledStatus variant="h6">{status}</StyledStatus>
                {tarefas.map((tarefa, index) => (
                  <TarefaContainer key={index} marginBottom="20px">
                    <Tarefa onSelect={() => setSelectedTarefa(tarefa)} selectedTarefa={selectedTarefa} setSelectedTarefa={setSelectedTarefa} tarefa={tarefa} />

                  </TarefaContainer>
              ))}
              </Box>
          ))}
          </Box>
        </StyledFlexBox>
      </Box>
      <TaskModal onClose={handleClose} open={open} setSelectedTarefa={setSelectedTarefa} task={selectedTarefa} />
    </Box>
  )
}
