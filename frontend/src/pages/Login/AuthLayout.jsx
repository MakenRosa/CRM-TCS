import { Outlet } from "react-router-dom"
import loginImage from "assets/login.png"
import { StyledContainer, StyledSectionImage } from "."

export const AuthLayout = () => 
  <StyledContainer disableGutters maxWidth={false}>
    <Outlet />
    <StyledSectionImage>
      <img alt="CRM intro" src={loginImage} />
    </StyledSectionImage>
  </StyledContainer>
