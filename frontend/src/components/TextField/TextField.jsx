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
  ...props
}) => (
  <StyledTextField
    InputProps={{
      startAdornment: <InputAdornment position={position}>{icon}</InputAdornment>
    }}
    autoComplete="off"
    fullWidth={fullWidth}
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
  onChange: PropTypes.func,
  position: PropTypes.oneOf(["start", "end"]),
  size: PropTypes.oneOf(["small", "medium"]),
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
}

TextField.defaultProps = {
  fullWidth: true,
  position: "start",
  size: "small",
  variant: "filled"
}
