import { Box, styled } from "@mui/material"

export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 24;
  padding: 30px;
  width: 600px; 
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 90vw;
  }
`

export const StyledColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  &:first-of-type {
    margin-right: 16px;
  }
  &:last-of-type {
    margin-left: 16px;
  }

  @media (max-width: 768px) {
    &:first-of-type, &:last-of-type {
      margin-right: 0;
      margin-left: 0;
    }
  }
`

export const StyledActionArea = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-right: 20px;
  gap: 20px;
`