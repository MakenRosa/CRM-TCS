import { Box, Paper, Typography, styled } from "@mui/material"

export const StyledKanbanCard = styled(Paper)`
  user-select: none;
  margin-top: 10px;
  padding: 0px;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;

  @media (max-width: 768px) {
    margin: 5px;
    padding: 5px; // Ajuste no padding para telas menores
  }
`

export const StyledCardLabel = styled(Typography)`
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 16px; 
  }
`

export const StyledCardDescription = styled(Typography)`
  font-size: 13px;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 13px; 
    margin: 5px 0; 
  }
`

export const StyledCardFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center; 

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const StyledKanbanCardDate = styled(Typography)`
  color: #681010;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`