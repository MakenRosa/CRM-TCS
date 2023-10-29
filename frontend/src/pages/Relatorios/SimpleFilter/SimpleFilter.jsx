import { Box, Typography } from "@mui/material"

import currency from 'assets/currency.svg'
import group from 'assets/group.svg'
import calendar from 'assets/calendar.svg'
import percentage from 'assets/percentage.svg'
import finish from 'assets/finish.svg'
import lost from 'assets/lost.svg'
import { StyledFilterBox } from "pages/Relatorios/Relatorios.styles"

export const SimpleFilter = () => (
  <Box display="flex" flexDirection="column" gap="5px" height="80%" justifyContent="center" marginTop="50px" width="80%">
    <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
      <StyledFilterBox>
        <img alt="Currency" src={currency} style={{ height: "50%" }} />
        <Typography color="#fff" variant="h6">Total de Vendas</Typography>
      </StyledFilterBox>
      <StyledFilterBox>
        <img alt="Group" src={group} style={{ height: "50%" }} />
        <Typography color="#fff" variant="h6">Equipes</Typography>
      </StyledFilterBox>
      <StyledFilterBox>
        <img alt="Calendar" src={calendar} style={{ height: "50%" }} />
        <Typography color="#fff" variant="h6">Agenda</Typography>
      </StyledFilterBox>
    </Box>
    <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
      <StyledFilterBox>
        <img alt="Percentage" src={percentage} style={{ height: "50%" }} />
        <Typography color="#fff" variant="h6">Conversão</Typography>
      </StyledFilterBox>
      <StyledFilterBox>
        <img alt="Finish" src={finish} style={{ height: "50%" }} />
        <Typography color="#fff" variant="h6">Concluídos</Typography>
      </StyledFilterBox>
      <StyledFilterBox>
        <img alt="Lost" src={lost} style={{ height: "50%" }} />
        <Typography color="#fff" variant="h6">Perdidos</Typography>
      </StyledFilterBox>
    </Box>
  </Box>
  )