import { Box, Card, Checkbox, Divider, styled } from "@mui/material"

export const PropostaCard = styled(Card)`
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

export const PropostaHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const StyledCheckbox = styled(Checkbox)`
  margin-left: -20px;
  margin-top: -20px;
  margin-right: 15px;
`  

export const InsideContent = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 120px;
`

export const StyledSubPropostas = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  overflow: visible;
`

export const StyledDivider = styled(Divider)`
  margin-left: 30px;
  margin-right: -60px;
`

export const CircleNumber = styled(Box)`
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
