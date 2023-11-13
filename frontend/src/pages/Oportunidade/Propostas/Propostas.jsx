import { Box, Divider, Typography  } from "@mui/material"
import { useEffect, useState } from "react"
import { getProposta } from "utils"
import { toast } from "react-toastify"
import { Proposta } from "./Proposta"
import { PropostaContainer, StyledButton, StyledButtons, StyledButtonsGroup, StyledFlexBox } from "./Propostas.styles"
import { PropostaModal } from "./PropostaModal"
import { DefinirVendaModal } from "./DefinirVendaModal"
import { DefinirPerdaModal } from "./DefinirPerdaModal"

export const Propostas = () => {
  const [propostas, setPropostas] = useState([])
  const [selectedCheckbox, setSelectedCheckbox] = useState(null)
  const [currentProposta, setCurrentProposta] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [isLostModalOpen, setIsLostModalOpen] = useState(false)

  const user_id = sessionStorage.getItem("user_id")
  useEffect(()  => {
    async function fetchPropostas () {
      try {
        const response = await getProposta(user_id)
        setPropostas(response.data.propostas)
      } catch (error) {
        toast.error("Erro ao buscar propostas")
      }
    }
    fetchPropostas()
  }, [])

  const handleCheckboxChange = proposta => {
    if (selectedCheckbox && selectedCheckbox.proposta.id === proposta.proposta.id) {
      setSelectedCheckbox(null)
    } else {
      setSelectedCheckbox(proposta) 
    }
  }

  const handleOpenModal = (proposta = null) => {
    setCurrentProposta(proposta)
    setSelectedCheckbox(null) 
    setIsModalOpen(true)
  }
  

  const handleCloseModal = () => {
    setCurrentProposta(null)
    setIsModalOpen(false)
  }

  const handleOpenSellModal = () => {
    setCurrentProposta(selectedCheckbox)
    setSelectedCheckbox(null)
    setIsSellModalOpen(true)
  }

  const handleCloseSellModal = () => {
    setIsSellModalOpen(false)
  }

  const handleOpenLostModal = () => {
    setCurrentProposta(selectedCheckbox)
    setSelectedCheckbox(null)
    setIsLostModalOpen(true)
  }

  const handleCloseLostModal = () => {
    setIsLostModalOpen(false)
  }
    
  return (
    <Box display={"flex"} flexDirection={"column"} margin={"10px"} minHeight={"500px"} width={1}>
      <StyledButtons>
        <StyledButtonsGroup>
          <StyledButton 
            disabled={!selectedCheckbox}
            onClick={handleOpenSellModal}
            variant={"primary"}
          >Venda
          </StyledButton>
          <StyledButton
            disabled={!selectedCheckbox}
            onClick={handleOpenLostModal}
            variant={"secondary"}
          >Perdido
          </StyledButton>
        </StyledButtonsGroup>
        <StyledButtonsGroup>
          <StyledButton 
            disabled={!selectedCheckbox}
            onClick={() => handleOpenModal(selectedCheckbox)}
          >
            Nova versão
          </StyledButton>
          <StyledButton 
            disabled={propostas.length !== 0} 
            onClick={() => handleOpenModal()}
            variant="primary"
          >
            Nova Proposta
          </StyledButton>
        </StyledButtonsGroup>
      </StyledButtons>
      <Box height={"100%"} position="relative" sx={{ overflowY: "scroll" }} width={1}>
        <StyledFlexBox>
          <Divider flexItem height="100%" orientation="vertical" sx={{ paddingLeft: "20px" }} />
          <Box marginLeft="20px" paddingRight="20px" width={1}>
            { propostas.length > 0 ?
            propostas.map(item => (
              <PropostaContainer key={item.proposta.id} marginBottom="20px">
                <Proposta 
                  isChecked={!!selectedCheckbox && selectedCheckbox.proposta.id === item.proposta.id}
                  onCheckboxChange={() => handleCheckboxChange(item)}
                  proposta={item.proposta}
                  subPropostas={item.subPropostas}
                />
              </PropostaContainer>
              )) : 
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              minHeight="100%"
            >
              <Typography sx={{
                    color: "#5038ed"
                  }}
                variant="h5"
              >
                Nenhuma proposta encontrada
              </Typography>
            </Box>
            }
          </Box>
        </StyledFlexBox>
      </Box>
      <PropostaModal handleClose={handleCloseModal} open={isModalOpen} proposta={currentProposta?.proposta} propostas={propostas} setPropostas={setPropostas} />
      {currentProposta && <DefinirVendaModal handleClose={handleCloseSellModal} open={isSellModalOpen} proposta={currentProposta?.proposta} />}
      {currentProposta && <DefinirPerdaModal handleClose={handleCloseLostModal} open={isLostModalOpen} proposta={currentProposta?.proposta} />}
    </Box>
  )
}