import React from 'react'
import { styled, Box, Typography } from '@mui/material'


const StyledContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(224deg, #9181f4 0%, #5038ed 100%);
  width: 100vw;
  height: 100vh;


  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
    height: 50%;
  }
`

export const NotFound = () => (
  <StyledContainer>
    <Typography color="textSecondary" variant="h1">
      404
    </Typography>
    <Typography color="textSecondary" variant="h4">
      Página não encontrada
    </Typography>
    <Typography color="textSecondary" variant="h6">
      A página que você está procurando não existe ou foi removida.
    </Typography>
    <Typography color="textSecondary" variant="h6">
      <a href="/">Voltar para a página inicial</a>
    </Typography>
  </StyledContainer>
  )

