import { Outlet } from "react-router-dom"
import loginImage from "assets/login.png"
import { StyledContainer, StyledSectionImage } from "."

export const AuthLayout = () => 
  <StyledContainer disableGutters maxWidth={false}>
    <Outlet />
    <StyledSectionImage>
      <img alt="Introdução ao sistema Solve" src={loginImage} />
    </StyledSectionImage>
  </StyledContainer>
  