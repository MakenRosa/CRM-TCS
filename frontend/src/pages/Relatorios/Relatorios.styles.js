import { Box, styled, IconButton } from '@mui/material'

export const StyledFilterContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  width: 750px;
  height: 60vh;
  background-color: #7663F1;
  border-radius: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%; // Ajusta a largura para uma porcentagem da tela
    margin-top: 60px; // Reduz a margem superior
    height: auto; // Ajusta a altura para ser automática
  }
`

export const StyledLogo = styled(Box)`
  top: -30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B07FEE;
  border-radius: 50%;
  font-size: 50px;
  width: 100px;
  height: 100px;

  @media (max-width: 768px) {
    top: -20px; // Ajusta a posição superior
    width: 80px; // Reduz a largura
    height: 80px; // Reduz a altura
  }
`

export const StyledIconButton = styled(IconButton)`
  top: 30px;
  left: 650px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 50px;
  &:hover {
    background-color: #B07FEE;
  }

  @media (max-width: 768px) {
    left: calc(90% - 50px); // Ajusta a posição para a esquerda
    font-size: 40px; // Reduz o tamanho da fonte
  }
`