import { useState } from "react"
import { Tab } from "@mui/material"
import { ContatoInicial } from "./ContatoInicial"
import { MainContainer, StyledLeadDetailInfo, StyledLeadDetailInfoTitle, StyledLeadDetailInfoValue, StyledLeadDetails, StyledLeadDetailsInfo, StyledLeadDetailsTitle, StyledLeadInfo, StyledLeadTitle, StyledOportunidade, StyledProposta, StyledTabs } from "./Oportunidade.styles"

export const Oportunidade = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <ContatoInicial />
      case 1:
        return <div>Conteúdo das Propostas</div>
        // eslint-disable-next-line no-magic-numbers
      case 2:
        return <div>Conteúdo das Tarefas</div>
        // eslint-disable-next-line no-magic-numbers
      case 3:
        return <div>Conteúdo do Histórico Lead</div>
      default:
        return null
    }
  }

  return ( 
    <StyledOportunidade>
      <StyledLeadInfo>
        <StyledLeadTitle component="h1" gutterBottom variant="h4">
          Nome do Negócio
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
                Netflix
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Cargo
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                CEO
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Email
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                Exemplo@gmail.com
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Telefone
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                (11) 99999-9999
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                Site
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                www.netflix.com
              </StyledLeadDetailInfoValue>
            </StyledLeadDetailInfo>
            <StyledLeadDetailInfo>
              <StyledLeadDetailInfoTitle component="p" gutterBottom variant="body1">
                LinkedIn
              </StyledLeadDetailInfoTitle>
              <StyledLeadDetailInfoValue component="p" gutterBottom variant="body2">
                www.linkedin.com/netflix
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
          textColor="none"
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