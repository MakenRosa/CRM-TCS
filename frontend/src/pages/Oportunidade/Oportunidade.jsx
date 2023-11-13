import { useEffect, useState } from "react"
import { Tab } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { getUniqueLead, getUniqueProspeccao } from "utils"
import { ContatoInicial } from "./ContatoInicial"
import { MainContainer, StyledLeadDetailInfo, StyledLeadDetailInfoTitle, StyledLeadDetailInfoValue, StyledLeadDetails, StyledLeadDetailsInfo, StyledLeadDetailsTitle, StyledLeadInfo, StyledLeadTitle, StyledOportunidade, StyledProposta, StyledTabs } from "./Oportunidade.styles"
import { Propostas } from "./Propostas"
import { Tarefas } from "./Tarefas"
import { HistoricoLead } from "./HistoricoLead"

export const Oportunidade = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [lead, setLead] = useState({})
  const [prospect, setProspect] = useState({})
  const { leadId, prospectId } = useParams()
  const userId = sessionStorage.getItem('user_id')

  const navigate = useNavigate()

  useEffect( () => {
    const getLead = async () => {
      const leadInfo = await getUniqueLead(leadId)
      .then(response => response.data.data.lead)
      .catch(() => navigate('/NotFound'))
      setLead(leadInfo)
    }
    const getProspect = async () => {
      const prospeccao = await getUniqueProspeccao(prospectId)
      .then(response => response.data.data.prospecção)
      .catch(() => navigate('/NotFound'))
      setProspect(prospeccao)
    }
    getLead()
    getProspect()
  }, [leadId, prospectId, userId])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <ContatoInicial empresa={lead.nomeEmpresa} {...prospect} />
      case 1:
        return <Propostas prospectId={prospectId} />
        // eslint-disable-next-line no-magic-numbers
      case 2:
        return <Tarefas negocio={prospect.nome_negocio} responsavel={lead.responsavel} />
        // eslint-disable-next-line no-magic-numbers
      case 3:
        return <HistoricoLead />
      default:
        return null
    }
  }

  return ( 
    <StyledOportunidade>
      <StyledLeadInfo>
        <StyledLeadTitle component="h1" gutterBottom variant="h4">
          {prospect.nome_negocio}
        </StyledLeadTitle>
        <StyledLeadDetails>
          <StyledLeadDetailsTitle component="h2" gutterBottom variant="h6">
            Detalhes do Lead
          </StyledLeadDetailsTitle>
          <StyledLeadDetailsInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Empresa
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                {lead.nomeEmpresa}
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Responsável
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                {lead.responsavel}
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Email
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                {lead.email}
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Telefone
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                {lead.telefone}
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Cargo
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                {lead.cargo}
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Descrição
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                {lead.descricao}
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
          </StyledLeadDetailsInfo>
        </StyledLeadDetails>
      </StyledLeadInfo>
      <StyledProposta>
        <StyledTabs
          aria-label="tabs"
          indicatorColor="none"
          onChange={handleTabChange}
          textColor="inherit"
          value={selectedTab}
        >
          <Tab label="Contato Inicial" />
          <Tab label="Propostas" />
          <Tab label="Tarefas" />
          <Tab label="Histórico Lead" />
        </StyledTabs>
        <MainContainer>
          {renderTabContent()}
        </MainContainer>
      </StyledProposta>
    </StyledOportunidade>
  )
}