import { Box, Divider, Typography, styled } from '@mui/material'

export const Column = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
`

export const ColDivider = styled(Divider)`
  height: 400px;
  margin: 0 120px;
  align-self: center;
`

export const StyledSection = styled(Box)`
  margin-bottom: 30px;
`

export const Header = styled(Typography)`
  color: #9181f4;
  font-weight: bold;
  margin: 20px 0 15px 0;
`

export const KeyValue = styled(Box)`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`

export const Key = styled(Typography)`
  font-weight: bold;
`

