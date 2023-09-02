import PropTypes from 'prop-types'
import { StyledButton } from '.'

export const Button = ({ children, disabled, variant, ...props }) => 
  <StyledButton disabled={disabled} variant={variant} {...props}>
    {children} 
  </StyledButton>

Button.propTypes = {
  children: PropTypes.node.isRequired, 
  disabled: PropTypes.bool, 
  variant: PropTypes.string 
}
