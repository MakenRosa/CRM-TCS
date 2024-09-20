import { Box, Card, Typography, styled } from "@mui/material"

export const HistoricoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 122px;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;
  border: 1px solid #8F8B8B;
  box-shadow: none;
  border-radius: 16px;
  overflow: visible;
  position: relative;
  z-index: 0;
  text-align: center;
  justify-content: center;
  `

export const CircleIcon = styled(Box)`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #9181F4;
  width: 35px;
  height: 35px;
  position: absolute;
  left: -20px;
  top: 42%;
  z-index: 2;
`

export const StyledTitle = styled(Typography)`
  font-weight: 600;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

export const StyledText = styled(Typography)`
  line-height: 2.0;
`
