import PropTypes from 'prop-types'
import { StyledContainer, StyledSectionImage } from './Login.styles'
import loginImage from 'assets/login.png'

export const AuthLayout = ({ children }) => {
	return (
		<StyledContainer disableGutters maxWidth={false}>
			{children}
			<StyledSectionImage>
				<img src={loginImage} alt="CRM intro" />
			</StyledSectionImage>
		</StyledContainer>
	)
}

AuthLayout.propTypes = {
	children: PropTypes.node.isRequired
}
