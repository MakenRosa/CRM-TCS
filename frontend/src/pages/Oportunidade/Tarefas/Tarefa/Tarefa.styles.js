import { Box, Card, Checkbox, styled } from "@mui/material"

export const TarefaCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 96px;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;
  border: 1px solid #8F8B8B;
  box-shadow: none;
  border-radius: 16px;
  overflow: visible;  
`

export const TarefaHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 20px;
  margin-top: -20px;
  margin-right: -15px;
`  

export const CircleIcon = styled(Box)`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #D9D9D9;
  color: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  position: absolute;
  left: -40px;
  top: 35%;
  z-index: 10;
`
