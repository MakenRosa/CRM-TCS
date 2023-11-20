import { Box, Divider } from "@mui/material"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getProposta, getTarefa } from "utils"
import { Tarefa } from "./Tarefa"
import {
  StyledButton,
  StyledButtons,
  StyledButtonsGroup,
  StyledFlexBox,
  StyledStatus,
  TarefaContainer
} from "./Tarefas.styles"
import { TarefaModal } from "./TarefaModal"

const agruparTarefas = tarefas => tarefas.reduce((acc, tarefa) => {
  const grupo = tarefa.concluida ? 'Concluída' : 'Planejada'
  if (!acc[grupo]) {
    acc[grupo] = []
  }
  acc[grupo].push(tarefa)
  return acc
}, {})

  export const Tarefas = ({ responsavel, negocio }) => {
  const [open, setOpen] = useState(false)
  const [selectedTarefa, setSelectedTarefa] = useState(null)
  const [proposta, setProposta] = useState([{}])
  const [propostaId, setPropostaId] = useState(null)
  const [tarefas, setTarefas] = useState([])

  const { prospectId } = useParams()
  const user_id = sessionStorage.getItem('user_id')

  useEffect(() => {
    async function fetchPropostas () {
      try {
        const response = await getProposta(user_id, prospectId)
        setProposta(response.data.propostas[0].proposta)
        setPropostaId(response.data.propostas[0].proposta.id)
      } catch (error) {
        toast.error('Erro ao buscar propostas')
      }
    }
    async function getTarefas () {
      try {
        const response = await getTarefa(propostaId)
        setTarefas(response.data.tarefas)
      }
      catch (error) {
        toast.error('Erro ao buscar tarefas')
      }
    }
    fetchPropostas()
    getTarefas()
  }, [propostaId])

  const handleNewTask = () => {
    setSelectedTarefa(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = () => {
    if (selectedTarefa) {
      setOpen(true)
    } else {
      toast.warning("Selecione uma tarefa para editar")
    }
  }

  const tarefasAgrupadas = agruparTarefas(tarefas)
  const ordemDosGrupos = ['Planejada', 'Concluída']

  return (
    <Box display={"flex"} flexDirection={"column"} margin={"10px"} minHeight={"500px"} width={1}>
      <StyledButtons>
        <StyledButtonsGroup>
          <StyledButton disabled={!selectedTarefa} variant={"primary"}>Concluir</StyledButton>
          <StyledButton disabled={!selectedTarefa}
            onClick={handleEdit}
            variant={"secondary"}
          >Editar
          </StyledButton>
          <StyledButton onClick={handleNewTask} variant={"primary"}>Nova Tarefa</StyledButton>
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
      <TarefaModal
        lead_responsavel={responsavel}
        nome_negocio={negocio}
        onClose={handleClose}
        open={open}
        proposta={proposta}
        setSelectedTarefa={setSelectedTarefa}
        setTarefas={setTarefas}
        task={selectedTarefa}
      />
    </Box>
  )
}

Tarefas.propTypes = {
  negocio: PropTypes.string,
  responsavel: PropTypes.string
}