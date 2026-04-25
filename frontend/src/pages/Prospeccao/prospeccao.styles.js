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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    padding: 10px;
  }
`

export const StyledFilterListOutlinedIcon = styled(FilterListOutlinedIcon)`
  font-size: 30px;
  color: #000;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`
