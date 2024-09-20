import { Box, TextField, Typography, styled } from "@mui/material"

export const StyledTextLabel = styled(Typography)`
  color: #fff;
  font-size: 16px;
`

export const StyledDateField = styled(TextField)`
  color: #fff;

  & .MuiInputBase-root {
    color: #fff;
  }
`

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
  cursor: ${ ({ button }) => (button ? 'pointer' : 'default') };

  &:hover {
    background-color: #8F4FEF;
  }

  &:active {
    background-color: ${ ({ button }) => (button ? '#7663F1' : '#8F4FEF') };
  }
`

export const StyledBoxRow = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  `