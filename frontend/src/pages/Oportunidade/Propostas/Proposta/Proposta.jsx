/* eslint-disable no-magic-numbers */
import { useState } from "react"
import PropTypes from "prop-types"
import { ExpandLess, ExpandMore, MoreHorizOutlined, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material"
import { Box, Card, Checkbox, Divider, IconButton, Typography, styled } from "@mui/material"

const PropostaCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;
  border: 1px solid #8F8B8B;
  box-shadow: none;
  border-radius: 8px;
  overflow: visible;  
`

const PropostaHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: -20px;
  margin-top: -20px;
  margin-right: 15px;
`  

const InsideContent = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 120px;
`

const StyledSubPropostas = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  overflow: visible;
`

const StyledDivider = styled(Divider)`
  margin-left: 30px;
  margin-right: -60px;
`

const CircleNumber = styled(Box)`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #8d8d8d;
  color: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  position: absolute;
  left: -36px;
  top: 40%;
  z-index: 10;
`


export const Proposta = ({ proposta, subPropostas, marginBottom }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Box display="flex" flexDirection="column" marginBottom={marginBottom}>
      <PropostaCard>
        <CircleNumber>{proposta.versao}</CircleNumber>
        <PropostaHeader>
          <StyledCheckbox checkedIcon={<RadioButtonChecked />} icon={<RadioButtonUnchecked />} size="small" />
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h5">
            {proposta.nome}
          </Typography>
          <Box>
            <IconButton>
              <MoreHorizOutlined fontSize="large" />
            </IconButton>
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ExpandLess sx={{ color: "#5038ed" }} /> : <ExpandMore sx={{ color: "#5038ed" }} />}
            </IconButton>
          </Box>
        </PropostaHeader>
        { !collapsed &&
          <Box display="flex" flexDirection="row" fontSize="12px" justifyContent="space-between" marginX="40px">
            <Typography variant="body1">{proposta.data}</Typography>
            <Typography variant="body1">{proposta.status}</Typography>
            <Typography variant="body1">{proposta.somatorio}</Typography>
            <Typography variant="body1">{proposta.probabilidade * 100}%</Typography>
            <Typography variant="body1">{proposta.tipoProjeto}</Typography>
          </Box>
            }
        {collapsed && (
          <InsideContent>
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography variant="body1">{proposta.descricao}</Typography>
              <Typography variant="body1">{proposta.consultor}</Typography>
              <Typography variant="body1">{proposta.tipoProjeto}</Typography>
              <Typography variant="body1">{proposta.influenciador}</Typography>
              <Typography variant="body1">{proposta.perfilOrcamento}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap="10px" marginTop="-20px">
              <Typography variant="body1">{proposta.data}</Typography>
              <Typography variant="body1">{proposta.probabilidade * 100}%</Typography>
              <Typography variant="body1">{proposta.status}</Typography>
              <Typography variant="body1">{proposta.materialInsumo}</Typography>
              <Typography variant="body1">{proposta.servicos}</Typography>
              <Typography variant="body1">{proposta.somatorio}</Typography>
            </Box>
          </InsideContent>
            )}
      </PropostaCard>
      <Box display={"flex"} flexDirection={"row"} overflow={"auto"} width={1}>
        <StyledDivider flexItem orientation="vertical" />
        <StyledSubPropostas marginLeft="20px" overflow={"auto"} width={1}>
          {subPropostas && subPropostas.map((subProposta, index) => (
            <Proposta key={index} proposta={subProposta} />
            ))}
        </StyledSubPropostas>
      </Box>
    </Box>
  )
}

Proposta.propTypes = {
  marginBottom: PropTypes.string,
  proposta: PropTypes.object,
  subPropostas: PropTypes.arrayOf(PropTypes.object)
}