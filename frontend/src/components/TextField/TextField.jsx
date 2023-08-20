import { TextField as FieldMui, InputAdornment, styled } from "@mui/material"
import PropTypes from "prop-types"

const StyledTextField = styled(FieldMui)`
  .MuiFilledInput-underline:before,
  & .MuiFilledInput-underline:after {
    display: none;
  }

  > div {
    border-radius: ${ props => props.borderRadius || "16px" };
    outline: none;
  }
  input {
    padding-top: 16px;
    margin-bottom: 8px;
  }
  svg {
    margin-bottom: 12px;
  }
`

export const TextField = ({ 
  icon, 
  fullWidth,
  position, 
  onChange, 
  type, 
  value, 
  ...props }) => 
    <StyledTextField
      InputProps={{
      startAdornment: <InputAdornment position={position}>{icon}</InputAdornment>
    }}
      autoComplete="off"
      fullWidth={fullWidth}
      onChange={onChange}
      type={type}
      value={value}
      {...props}
    />


TextField.propTypes = {
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  position: PropTypes.oneOf(["start", "end"]),
  type: PropTypes.string,
  value: PropTypes.string
}
