import { Container, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { Navigate } from "react-router-dom"

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`

const NotFoundTitle = styled(Typography)`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
`

const NotFoundText = styled(Typography)`
  font-size: 18px;
  margin-bottom: 16px;
`

const NavigateLink = styled(Navigate)`
  text-decoration: underline;
  color: #0000ee;
  cursor: pointer;
`

export const NotFound = () => 
  <NotFoundContainer>
    <NotFoundTitle>Página não encontrada</NotFoundTitle>
    <NotFoundText>Desculpe, não conseguimos encontrar o que você está procurando.</NotFoundText>
    <NavigateLink replace to="/login">Voltar para a página de login</NavigateLink>
  </NotFoundContainer>

