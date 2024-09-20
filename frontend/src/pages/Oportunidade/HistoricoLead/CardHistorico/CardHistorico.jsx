/* eslint-disable no-magic-numbers */
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import { differenceInHours, differenceInMinutes, format } from "date-fns"
import { HistoricoCard, StyledText, StyledTitle } from "./CardHistorico.styles"

const calcularTempoNaColuna = (dataInicial, dataFinal) => {
  const horas = differenceInHours(new Date(dataFinal), new Date(dataInicial))
  const minutos = differenceInMinutes(new Date(dataFinal), new Date(dataInicial)) % 60
  return `${ horas }h ${ minutos }min`
}

export const CardHistorico = ({ item, itemPosterior, dataAtual }) => {
  let tempoNaColuna = ""
  let tempoNaColunaAtual = ""

  if (itemPosterior && (
    item.etapa !== itemPosterior.etapa ||
    item.informacoes !== itemPosterior.informacoes && (item.informacoes || itemPosterior.informacoes)
  )) {
    tempoNaColuna = calcularTempoNaColuna(item.data_ocorrencia, itemPosterior.data_ocorrencia)
  }

  if (!itemPosterior) { 
    tempoNaColunaAtual = calcularTempoNaColuna(item.data_ocorrencia, dataAtual)
  }

  return (
    <Box display="flex" flexDirection="column" marginBottom="20px">
      <HistoricoCard>
        <Box display="flex" flexDirection="row" fontSize="12px" justifyContent="space-around" marginX="0px">
          <Box>
            <StyledTitle variant="h5">{item.ocorrencia}</StyledTitle>
          </Box>
          <Box>
            <StyledText>{item.etapa}</StyledText>
            <StyledText>{format(new Date(item.data_ocorrencia), 'dd/MM/yyyy HH:mm')}</StyledText>
          </Box>
          <Box marginRight="40px">
            <StyledText>{item.informacoes || ""}</StyledText>
            {tempoNaColuna && (
            <StyledText>Tempo na coluna: {tempoNaColuna}</StyledText>
      )}
            {tempoNaColunaAtual && (
            <StyledText>Tempo na coluna atual: {tempoNaColunaAtual}</StyledText>
      )}
          </Box>
        </Box>
      </HistoricoCard>
    </Box>
  )
}

CardHistorico.propTypes = {
  dataAtual: PropTypes.string,
  item: PropTypes.object,
  itemPosterior: PropTypes.object
}