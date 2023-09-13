import { Box } from "@mui/material"
import PropTypes from "prop-types"

export const Form = ({ children, sx, ...props }) => 
  <Box
    component="form"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      ...sx
    }}
    width="100%"
    {...props}
  >
    {children}
  </Box>

Form.propTypes = {
  children: PropTypes.node.isRequired, 
  sx: PropTypes.object
}

Form.defaultProps = {
  sx: {} 
}
