import { Box, styled } from "@mui/material"

export const StyledSection = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > h1 {
    color: #000;
    font-family: "Poppins", sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0em;
  }

  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    max-width: 400px;
    height: 100%;
    gap: 30px;
    @media (max-width: 768px) {
      width: 80%;
      max-width: 400px;
      margin: 20px auto;
    }
  }
`

