import { StyledContainer, StyledSectionImage } from "./Login.styles"
import { Outlet } from "react-router-dom"
import loginImage from "assets/login.png"

export const AuthLayout = () => 
  <StyledContainer disableGutters maxWidth={false}>
    <Outlet />
    <StyledSectionImage>
      <img alt="CRM intro" src={loginImage} />
    </StyledSectionImage>
  </StyledContainer>


AuthLayout.propTypes = {
}
