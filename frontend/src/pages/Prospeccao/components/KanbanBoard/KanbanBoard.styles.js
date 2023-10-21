import { Box, styled } from "@mui/material"

export const StyledKanbanContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  overflow: scroll;
  background: #F3EFEF;
  height: calc(100vh - 220px);
  margin-top: 20px;
  width: 100%;

  .columnTitle {
    cursor: pointer;
  }

  .columnGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 255px;
    .propostaColumns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      width: calc(90vw - 255px);
    }
  }
`