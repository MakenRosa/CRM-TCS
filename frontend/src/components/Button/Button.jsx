import { Button as BtnMui, styled } from '@mui/material'
import PropTypes from 'prop-types'

const StyledButton = styled(BtnMui)`
	background: ${ props => props.backgroundColor };
`
export const Button = ({ children, ...props }) => 
  <StyledButton {...props}>
    {children}
  </StyledButton>

Button.propTypes = {
  children: PropTypes.node.isRequired
}
