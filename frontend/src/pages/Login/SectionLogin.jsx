import Form from "components/Form"
import PropTypes from "prop-types"
import { StyledSection } from "./Login.styles"

export const SectionLogin = ({ title, children }) => 
  <StyledSection>
    <h1>
      {title}
    </h1>
    <Form>
      {children}
    </Form>
  </StyledSection>


SectionLogin.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}
