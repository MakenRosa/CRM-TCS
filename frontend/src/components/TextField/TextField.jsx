import PropTypes from "prop-types"
import { InputAdornment  } from "@mui/material"
import { StyledTextField } from "."

export const TextField = ({
  borderRadius,
  icon,
  fullWidth,
  position,
  size,
  variant,
  onChange,
  type,
  value,
  multiline,
  readOnly,
  ...props
}) => (
  <StyledTextField
    InputProps={{
      startAdornment: <InputAdornment position={position}>{icon}</InputAdornment>,
      readOnly
    }}
    autoComplete="off"
    fullWidth={fullWidth}
    multiline={multiline}
    onChange={onChange}
    size={size}
    sx={{ borderRadius }}
    type={type}
    value={value}
    variant={variant}
    {...props}
  />
)

TextField.propTypes = {
  borderRadius: PropTypes.string,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  position: PropTypes.oneOf(["start", "end"]),
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
}

TextField.defaultProps = {
  fullWidth: true,
  multiline: false,
  position: "start",
  size: "small",
  variant: "filled"
}
