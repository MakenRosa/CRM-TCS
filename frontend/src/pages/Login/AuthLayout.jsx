import { StyledContainer, StyledSectionImage } from "./Login.styles"
import PropTypes from "prop-types"
import loginImage from "assets/login.png"

export const AuthLayout = ({ children }) => 
  <StyledContainer disableGutters maxWidth={false}>
    {children}
    <StyledSectionImage>
      <img alt="CRM intro" src={loginImage} />
    </StyledSectionImage>
  </StyledContainer>


AuthLayout.propTypes = {
  children: PropTypes.node.isRequired
}
