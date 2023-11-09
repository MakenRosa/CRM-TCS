/* eslint-disable no-magic-numbers */
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { ExpandLess, ExpandMore, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { getUser } from "utils"
import { toast } from "react-toastify"
import { CircleNumber, InsideContent, PropostaCard, PropostaHeader, StyledCheckbox, StyledDivider, StyledSubPropostas } from "./Proposta.styles"

export const Proposta = ({ proposta, subPropostas, marginBottom, onCheckboxChange, isChecked, showCheckbox=true }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [consultor, setConsultor] = useState("")

  useEffect(() => {
    async function fetchConsultor () {
      try {
        const response = await getUser(proposta.consultor_prop)
        setConsultor(`${ response.data.first_name  } ${  response.data.last_name }`)
      }
      catch (error) {
        toast.error("Erro ao buscar consultor")
      }
    }
    fetchConsultor()
  }, [])

  return (
    <Box display="flex" flexDirection="column" marginBottom={marginBottom}>
      <PropostaCard>
        <CircleNumber>{proposta.versao}</CircleNumber>
        <PropostaHeader>
          {showCheckbox && <StyledCheckbox
            checked={isChecked}
            checkedIcon={<RadioButtonChecked />}
            icon={<RadioButtonUnchecked />}
            onChange={() => onCheckboxChange(proposta)}
            size="small"
          />}
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h5">
            {proposta.nome_proposta}
          </Typography>
          <Box>
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ExpandLess sx={{ color: "#5038ed" }} /> : <ExpandMore sx={{ color: "#5038ed" }} />}
            </IconButton>
          </Box>
        </PropostaHeader>
        { !collapsed &&
          <Box display="flex" flexDirection="row" fontSize="12px" justifyContent="space-between" marginX="40px">
            <Typography variant="body1">{proposta.data_cadastro}</Typography>
            <Typography variant="body1">{proposta.status_proposta}</Typography>
            <Typography variant="body1">R${proposta.valor_proposta.toFixed(2).replace('.', ',')}</Typography>
            <Typography variant="body1">{proposta.prob_fechamento.includes("%") ? proposta.prob_fechamento : `${ proposta.prob_fechamento }%`} </Typography>
            <Typography variant="body1">{proposta.tipo_projeto}</Typography>
          </Box>
            }
        {collapsed && (
          <InsideContent>
            <Box display="flex" flexDirection="column" gap="10px">
              <Typography variant="body1">{proposta.desc_proposta}</Typography>
              <Typography variant="body1">{consultor}</Typography>
              <Typography variant="body1">{proposta.tipo_projeto}</Typography>
              <Typography variant="body1">{proposta.influenciador_decisor}</Typography>
              <Typography variant="body1">{proposta.perfil_orcamento}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap="10px" marginTop="-20px">
              <Typography variant="body1">{proposta.data_cadastro}</Typography>
              <Typography variant="body1">{proposta.prob_fechamento.includes("%") ? proposta.prob_fechamento : `${ proposta.prob_fechamento }%`} </Typography>
              <Typography variant="body1">{proposta.status_proposta}</Typography>
              <Typography variant="body1">{proposta.material_insumo}</Typography>
              <Typography variant="body1">{proposta.servicos}</Typography>
              <Typography variant="body1">{proposta.valor_proposta}</Typography>
            </Box>
          </InsideContent>
            )}
      </PropostaCard>
      <Box display={"flex"} flexDirection={"row"} overflow={"auto"} width={1}>
        <StyledDivider flexItem orientation="vertical" />
        <StyledSubPropostas marginLeft="20px" overflow={"auto"} width={1}>
          {subPropostas && subPropostas.map((subProposta, index) => (
            <Proposta key={index} proposta={subProposta} showCheckbox={false} />
            ))}
        </StyledSubPropostas>
      </Box>
    </Box>
  )
}

Proposta.propTypes = {
  isChecked: PropTypes.bool,
  marginBottom: PropTypes.string,
  onCheckboxChange: PropTypes.func,
  proposta: PropTypes.object,
  showCheckbox: PropTypes.bool,
  subPropostas: PropTypes.arrayOf(PropTypes.object)
}