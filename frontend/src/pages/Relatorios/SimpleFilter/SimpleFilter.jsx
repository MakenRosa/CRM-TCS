import { Box, Typography } from "@mui/material"

import currency from 'assets/currency.svg'
import group from 'assets/group.svg'
import calendar from 'assets/calendar.svg'
import percentage from 'assets/percentage.svg'
import finish from 'assets/finish.svg'
import lost from 'assets/lost.svg'
import { StyledFilterBox } from "pages/Relatorios/Relatorios.styles"
import { getFunil, getPropostaProspeccao, getProspeccaoLeads, getVendasProposta, getVendasProspeccao } from "utils"
import { toast } from "react-toastify"

const API_FUNCTIONS = {
  "Propostas P/ Prospecção": getPropostaProspeccao,
  "Prospecções P/ Lead": getProspeccaoLeads,
  "Vendas -> propostas": getVendasProposta,
  "Prospecções -> vendas": getVendasProspeccao,
  "Funil de Vendas": getFunil
}

export const SimpleFilter = () => { 
  const user_id = sessionStorage.getItem("user_id")

  const handleBoxClick = async title => {
    if (API_FUNCTIONS[title]) {
      const url = API_FUNCTIONS[title](user_id)
      
      const response = await fetch(url)
  
      if (response.ok) {
        window.open(url, '_blank')
        toast.success(`O download de ${ title } foi iniciado`)
      } else {
        toast.error(`Erro ao buscar dados de ${ title }`)
      }
    } else {
      toast.error(`Erro ao buscar dados de ${ title }`)
    }
  }
  

  const renderBox = (alt, src, title) => (
    <StyledFilterBox onClick={() => handleBoxClick(title)}>
      <img alt={alt} src={src} style={{ height: "50%" }} />
      <Typography color="#fff" variant="h6">{title}</Typography>
    </StyledFilterBox>
  )

  return (
    <Box display="flex" flexDirection="column" gap="5px" height="80%" justifyContent="center" marginTop="50px" width="80%">
      <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
        {renderBox("Currency", currency, "Propostas P/ Prospecção")}
        {renderBox("Group", group, "Prospecções P/ Lead")}
        {renderBox("Calendar", calendar, "Vendas -> propostas")}
      </Box>
      <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
        {renderBox("Percentage", percentage, "Prospecções -> vendas")}
        {renderBox("Finish", finish, "Funil de Vendas")}
        {renderBox("Lost", lost, "Menu BI")}
      </Box>
    </Box>
  )
}