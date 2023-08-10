import PropTypes from 'prop-types'
import Form from 'components/Form'
import { StyledSection } from './Login.styles'

export const SectionLogin = ({ title, children }) => (
	<StyledSection>
		<h1>{title}</h1>
		<Form>{children}</Form>
	</StyledSection>
)

SectionLogin.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}
