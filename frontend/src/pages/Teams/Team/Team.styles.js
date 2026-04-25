import { RadioButtonChecked } from "@mui/icons-material"
import { Box, styled } from "@mui/material"

export const StyledTeam = styled(Box)`
  position: relative;
  background-color: white;
  padding: 20px 20px ${ props => (props.isCollapsed ? "20px" : "0px") } 20px;
  border: 1px solid #736C6C;

  @media (max-width: 768px) {
    padding: 10px; // Reduzindo o padding em telas menores
  }
`
export const StyledCheckedIcon = styled(RadioButtonChecked)`
  color: #9181f4;
`
