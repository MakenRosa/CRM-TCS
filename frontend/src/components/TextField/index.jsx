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

export const TextField = ({ icon, position, ...props }) => 
  <StyledTextField
    InputProps={{
      startAdornment: 
  <InputAdornment position={position}>
    {icon}
  </InputAdornment>
      
    }}
    {...props}
  />


TextField.propTypes = {
  icon: PropTypes.node,
  position: PropTypes.oneOf(["start", "end"])
}
