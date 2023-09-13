import PropTypes from "prop-types"
import { StyledSection } from "."

export const SectionLogin = ({ title, h, children }) => {
  const height = h

  return (
    <StyledSection height={height}>
      <h1>{title}</h1> 
      {children} 
    </StyledSection>
  )
}

SectionLogin.propTypes = {
  children: PropTypes.node.isRequired, 
  h: PropTypes.string,
  title: PropTypes.string.isRequired 
}

SectionLogin.defaultProps = {
  h: "60%" 
}