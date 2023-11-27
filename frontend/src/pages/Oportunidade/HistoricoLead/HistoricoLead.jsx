import PropTypes from "prop-types"
import { Box, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getHistorico } from "utils"
import { toast } from "react-toastify"
import { CardHistorico } from "./CardHistorico/CardHistorico"
import { StyledFlexBox } from "./HistoricoLead.styles"

export const HistoricoLead = ({ prospectId }) => {
  const [historico, setHistorico] = useState([])

  useEffect(() => {
    getHistorico(prospectId)
      .then(res => {
        console.log(res.data.data)
        if (res && res.data && Array.isArray(res.data.data.dados_historico)) {
          setHistorico(res.data.data.dados_historico)
        } else {
          throw new Error("Dados inválidos recebidos da API")
        }
      })
      .catch(err => {
        toast.error(`Erro ao carregar o histórico: ${  err.message }`)
      })
  }, [prospectId])
  

  return(
    <Box 
      display={"flex"}
      flexDirection={"column"}
      margin={"10px"}
      minHeight={"500px"}
      width={1}
    >
      <Box height={"100%"} position="relative" width={1} >
        <StyledFlexBox>
          <Divider flexItem height={"100%"} orientation="vertical" sx={{ paddingLeft: "20px", zIndex: 0 }} />
          <Box marginLeft="20px" maxHeight={"500px"} paddingRight="20px" sx={{ overflowY: "scroll" }} width={1}>
            {historico.length > 0 ?
            historico.map((item, index) => {
              const itemPosterior = index < historico.length - 1 ? historico[index + 1] : null
              return <CardHistorico dataAtual={new Date()} item={item} itemPosterior={itemPosterior} key={item.id} />
            })
             : <Typography variant="h5">Nenhum histórico encontrado</Typography>}
          </Box>
        </StyledFlexBox>
      </Box>
    </Box>
  )
}

HistoricoLead.propTypes = {
  prospectId: PropTypes.string
}