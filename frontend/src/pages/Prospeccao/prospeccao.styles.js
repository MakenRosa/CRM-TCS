import { Box, styled } from "@mui/material"
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'


export const StyledBar = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  box-sizing: border-box;
  height: 72px; 
  background: #F3EFEF;
  align-items: center;
`

export const StyledFilterListOutlinedIcon = styled(FilterListOutlinedIcon)`
  font-size: 30px;
  color: #000;
`