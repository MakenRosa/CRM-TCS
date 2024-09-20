import { Box, Card, Typography, styled } from "@mui/material"

const HistoricoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 192px;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;
  border: 1px solid #8F8B8B;
  box-shadow: none;
  border-radius: 16px;
  overflow: visible;
`

const CircleIcon = styled(Box)`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #9181F4;
  width: 35px;
  height: 35px;
  position: absolute;
  left: -20px;
  top: 42%;
  z-index: 2;
`

const StyledTitle = styled(Typography)`
  font-weight: 600;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const StyledText = styled(Typography)`
  line-height: 2.0;
`

export const CardHistorico = () => (
  <Box display="flex" flexDirection="column" marginBottom="20px">
    <HistoricoCard>
      <CircleIcon />
      <Box display="flex" flexDirection="row" fontSize="12px" justifyContent="space-between" marginX="40px">
        <Box>
          <StyledTitle variant="h5">Nome Negócio</StyledTitle>
        </Box>
        <Box>
          <StyledText>Segmento</StyledText>
          <StyledText>Participação Comercial</StyledText>
          <StyledText>Participação Efetiva</StyledText>
          <StyledText>Data Início da Prospecção</StyledText>
          <StyledText>Data Contato Inicial</StyledText>
        </Box>
        <Box marginRight="40px">
          <StyledText>Status Proposta</StyledText>
          <StyledText>Data Fechamento</StyledText>
          <StyledText>Data Último Contato</StyledText>
        </Box>
      </Box>
    </HistoricoCard>
  </Box>
)
