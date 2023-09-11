import { Typography } from '@mui/material'
import { StyledNotFoundContainer } from '.'

export const NotFound = () => (
  <StyledNotFoundContainer>
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
  </StyledNotFoundContainer>
  )

