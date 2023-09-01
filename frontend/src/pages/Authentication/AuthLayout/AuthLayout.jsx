import { Outlet } from "react-router-dom"
import loginImage from "assets/login.png"
import { StyledContainer, StyledSectionImage } from "."

export const AuthLayout = () => 
  <StyledContainer disableGutters maxWidth={false}>
    <Outlet /> {/* Renderiza a rota correspondente dentro deste layout */}
    <StyledSectionImage>
      <img alt="Introdução ao sistema Solve" src={loginImage} /> {/* Imagem de introdução ao lado da rota */}
    </StyledSectionImage>
  </StyledContainer>
