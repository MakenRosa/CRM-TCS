import { Box, styled } from "@mui/material"

export const StyledKanbanContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  overflow: scroll;
  background: #F3EFEF;
  height: calc(100vh - 240px);
  margin-top: 20px;
`