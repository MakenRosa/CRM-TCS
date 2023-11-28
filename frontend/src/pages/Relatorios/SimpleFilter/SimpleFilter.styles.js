import { Box, styled } from "@mui/material"

export const StyledFilterBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: #B07FEE;
  width: 200px;
  height: 200px;
  cursor: ${ ({ button }) => (button ? 'pointer' : 'default') };
  margin: 10px; // Adicionado margem para espaçamento

  &:hover {
    background-color: #8F4FEF;
  }

  &:active {
    background-color: ${ ({ button }) => (button ? '#7663F1' : '#8F4FEF') };
  }

  @media (max-width: 600px) {
    width: 250px; // Reduzindo o tamanho em telas menores
    height: 200px;
    margin-top: 30px;
  }
`

export const StyledSimpleFilter = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: 60px;
    text-align: center;
    padding-bottom: 20px;
  }
`
