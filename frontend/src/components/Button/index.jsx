import { Button as BtnMui, styled } from '@mui/material'
import PropTypes from 'prop-types'
const StyledButton = styled(BtnMui)`
	background: ${(props) => props.backgroundColor};
`
export const Button = ({ children, ...props }) => {
	return <StyledButton {...props}>{children}</StyledButton>
}

Button.propTypes = {
	children: PropTypes.node.isRequired
}

export default Button
