import { Box, styled } from "@mui/material"

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