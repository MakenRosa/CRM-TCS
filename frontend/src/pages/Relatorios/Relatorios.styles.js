import { Box, styled, IconButton } from '@mui/material'

export const StyledFilterBox = styled(Box)`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: #B07FEE;
  width: 200px;
  height: 200px;
  cursor: pointer;

  &:hover {
    background-color: #A26BEF;
  }

  &:active {
    background-color: #A26BEF;
  }
`

export const StyledFilterContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  width: 750px;
  height: 60vh;
  background-color: #7663F1;
  border-radius: 16px;
`

export const StyledLogo = styled(Box)`
  top: -30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B07FEE;
  border-radius: 50%;
  font-size: 50px;
  width: 100px;
  height: 100px;
`

export const StyledIconButton = styled(IconButton)`
  top: 30px;
  left: 650px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 50px;
  &:hover {
    background-color: #B07FEE;
  }
`
