import { Button as BtnMui, styled } from '@mui/material'
import PropTypes from 'prop-types'

const StyledButton = styled(BtnMui)`
`

export const Button = ({ children, disabled, ...props }) => 
  <StyledButton disabled={disabled} {...props}>
    {children}
  </StyledButton>

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
}
