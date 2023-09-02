import { NavigateLink, NotFoundContainer, NotFoundText, NotFoundTitle } from "."

export const NotFound = () => 
  <NotFoundContainer>
    <NotFoundTitle>Página não encontrada</NotFoundTitle>
    <NotFoundText>Desculpe, não conseguimos encontrar o que você está procurando.</NotFoundText>
    <NavigateLink replace to="/login">Voltar para a página de login</NavigateLink>
  </NotFoundContainer>

