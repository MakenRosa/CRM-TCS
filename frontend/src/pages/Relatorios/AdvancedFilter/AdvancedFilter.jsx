import PropTypes from 'prop-types'
import { Box, Checkbox, MenuItem, Select, TextField, Tooltip, Typography, styled } from "@mui/material"
import map from 'assets/map.svg'
import map2 from 'assets/map2.svg'
import clock from 'assets/clock.svg'
import certificate from 'assets/certificate.svg'
import hourglass from 'assets/hourglass.svg'
import goback from 'assets/goback.svg'
import { StyledFilterBox } from "pages/Relatorios/Relatorios.styles"
import { useEffect, useState } from 'react'

const StyledTextLabel = styled(Typography)`
  color: #fff;
  font-size: 16px;
`

const StyledDateField = styled(TextField)`
  color: #fff;

  & .MuiInputBase-root {
    color: #fff;
  }
`

const StyledTooltip = styled(Tooltip)`
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  padding: 5px;
  & .MuiTooltip-tooltip {
    background-color: #fff;
    color: #000;
    font-size: 14px;
    padding: 10px;
  }
`


export const AdvancedFilter = ({ setIsAdvancedFilter }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const toggleTooltip = () => {
    if (!isTooltipOpen) {
      setIsTooltipOpen(true)
      return
    }
    setIsTooltipOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (event.target.id !== "start-date" && event.target.id !== "end-date" && event.target.id !== "select-data") {
        setIsTooltipOpen(false)
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Box display="flex" flexDirection="column" gap="5px" height="80%" justifyContent="center" marginTop="50px" width="80%">
      <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
        <StyledFilterBox>
          <img alt="map" src={map} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Estágio Negociação</StyledTextLabel>
          <Select defaultValue="Selecione" size="small" style={{ color: "#fff" }}>
            <MenuItem value="Selecione">Selecione</MenuItem>
            <MenuItem value="Lead">Lead</MenuItem>
            <MenuItem value="Prospeccao">Prospecção</MenuItem>
            <MenuItem value="Proposta">Proposta</MenuItem>
            <MenuItem value="Venda">Venda</MenuItem>
            <MenuItem value="Perdido">Perdido</MenuItem>
          </Select>
        </StyledFilterBox>
        <StyledFilterBox>
          <img alt="map2" src={map2} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Data Próxima Ação</StyledTextLabel>
          <StyledDateField id="date" size="small" style={{ color: "#fff" }} type="date" />
        </StyledFilterBox>
        <StyledFilterBox>
          <img alt="clock" src={clock} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Última Ação</StyledTextLabel>
          <StyledDateField id="date" size="small" style={{ color: "#fff" }} type="date" />
        </StyledFilterBox>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
        <StyledFilterBox>
          <img alt="certificate" src={certificate} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Comissão</StyledTextLabel>
          <Checkbox style={{ color: "#fff" }} />
        </StyledFilterBox>
        <StyledFilterBox>
          <img alt="hourglass" src={hourglass} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Histórico</StyledTextLabel>
          <StyledTooltip
            disableHoverListener
            open={isTooltipOpen}
            title={
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography variant="body1">Data Inicial</Typography>
                <StyledDateField 
                  id="start-date"
                  size="small"
                  type="date"
                />
                <Typography variant="body1">Data Final</Typography>
                <StyledDateField 
                  id="end-date"
                  size="small"
                  type="date"
                />
              </Box>
    }
          >
            <Typography id="select-data" onClick={toggleTooltip}>Selecionar Datas</Typography>
          </StyledTooltip>
        </StyledFilterBox>
        <StyledFilterBox onClick={() => setIsAdvancedFilter(false)}>
          <img alt="goback" src={goback} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Voltar ao Filtro Básico</StyledTextLabel>
        </StyledFilterBox>
      </Box>
    </Box>
)
        }
AdvancedFilter.propTypes = {
  setIsAdvancedFilter: PropTypes.func.isRequired
}