import { Box, Divider, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { getHistorico } from "utils"
import { CardHistorico } from "./CardHistorico/CardHistorico"
const StyledFlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 0;
`

export const HistoricoLead = () => {
  const [historico, setHistorico] = useState([])

  const user_id = sessionStorage.getItem("user_id")
  
  useEffect(() => {
    getHistorico(user_id).then(res => {
      setHistorico(res)
    })
  }, [])

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
            <CardHistorico />
            <CardHistorico />
            <CardHistorico />
          </Box>
        </StyledFlexBox>
      </Box>
    </Box>
  )
}