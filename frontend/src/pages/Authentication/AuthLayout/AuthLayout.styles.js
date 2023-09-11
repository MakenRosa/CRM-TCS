import { Box, Container, styled } from "@mui/material"

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: 130vh;
  }
`

export const StyledSectionImage = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: right;
  background: linear-gradient(224deg, #9181f4 0%, #5038ed 100%);
  width: 90%;
  height: 100%;

  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
    height: 50%;
  }

  > img {
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
      width: auto;
      height: 50%;
    }
  }
`