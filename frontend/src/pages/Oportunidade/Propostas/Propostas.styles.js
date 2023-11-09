import { Box, styled } from "@mui/material"
import { Button } from "components"

export const StyledButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
`

export const StyledButtonsGroup = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 30px;
`

export const StyledButton = styled(Button)`
  min-width: 120px;
`

export const PropostaContainer = styled(Box)`
  position: relative;
`

export const StyledFlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: auto;
  position: relative;
`
