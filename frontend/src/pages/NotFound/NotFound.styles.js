import { Box, styled } from "@mui/material"


export const StyledNotFoundContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(224deg, #9181f4 0%, #5038ed 100%);
  width: 100vw;
  height: 100vh;


  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`
