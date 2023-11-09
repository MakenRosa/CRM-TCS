import { Box, Typography, styled } from "@mui/material"
import { Button } from "components"

export const StyledButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 10px;
`

export const StyledButtonsGroup = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 30px;
`

export const StyledButton = styled(Button)`
  min-width: 120px;
`

export const TarefaContainer = styled(Box)`
  position: relative;
`

export const StyledFlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: auto;
  position: relative;
`

export const StyledStatus = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #EDEBFD;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 0px 10px 10px 0px;
  margin-left: -20px;
`
