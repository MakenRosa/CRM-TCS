import PropTypes from 'prop-types'
import { Box } from '@mui/material'

export const Form = ({ children, sx, ...props }) => {
	return (
		<Box
			fullWidth
			width="100%"
			component="form"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				...sx
			}}
			{...props}
		>
			{children}
		</Box>
	)
}

Form.propTypes = {
	children: PropTypes.node.isRequired,
	sx: PropTypes.object
}

export default Form
