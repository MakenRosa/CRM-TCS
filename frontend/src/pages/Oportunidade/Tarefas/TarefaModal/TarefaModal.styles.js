import { Box, Radio, Typography, styled } from "@mui/material"
import { TextField } from "components"

export const ModalContainer = styled(Box)`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  overflow: auto;
  padding: 20px;
`

export const ModalContent = styled(Box)`
  width: 500px;
  padding: 20px;
  background-color: #FFF;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

export const ModalTitle = styled(Typography)`
  color: #5038ED;
  font-size: 26px;
  margin-bottom: 20px;
`

export const IconContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 8px;
  width: fit-content;
  border: 1px solid #746F6F;
  padding: 5px;
`

export const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`

export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

export const StyledRadio = styled(Radio)`
  &.Mui-checked {
    color: #746F6F;
    background-color: #EDEBFD;
    border-radius: 8px;
  }
`