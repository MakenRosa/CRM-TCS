import { Box, Divider } from "@mui/material"
import { TaskModal } from "components"
import { useState } from "react"
import { toast } from "react-toastify"
import data from "./data.json"
import { Tarefa } from "./Tarefa"
import { StyledButton, StyledButtons, StyledButtonsGroup, StyledFlexBox, StyledStatus, TarefaContainer } from "./Tarefas.styles"

const agruparTarefas = tarefas => tarefas.reduce((acc, tarefa) => {
    const grupo = tarefa.concluida ? 'Concluída' : 'Planejada'
    if (!acc[grupo]) {
      acc[grupo] = []
    }
    acc[grupo].push(tarefa)
    return acc
  }, {})

export const Tarefas = () => {
  const [open, setOpen] = useState(false)
  const [selectedTarefa, setSelectedTarefa] = useState(null)

  const handleOpen = () => {
    setOpen(true)
    console.log(selectedTarefa)
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

  const tarefasAgrupadas = agruparTarefas(data.tarefas)

  const ordemDosGrupos = ['Planejada', 'Concluída']

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
            {ordemDosGrupos.map(grupo => {
          const tarefasDoGrupo = tarefasAgrupadas[grupo] || []
          return (
            <Box key={grupo}>
              {tarefasDoGrupo.length > 0 && <StyledStatus variant="h6">{grupo}</StyledStatus>}
              {tarefasDoGrupo.map((tarefa, index) => (
                <TarefaContainer key={index} marginBottom="20px">
                  <Tarefa onSelect={() => setSelectedTarefa(tarefa)} selectedTarefa={selectedTarefa} setSelectedTarefa={setSelectedTarefa} tarefa={tarefa} />
                </TarefaContainer>
              ))}
            </Box>
          )
        })}
          </Box>
        </StyledFlexBox>
      </Box>
      <TaskModal onClose={handleClose} open={open} setSelectedTarefa={setSelectedTarefa} task={selectedTarefa} />
    </Box>
  )
}
