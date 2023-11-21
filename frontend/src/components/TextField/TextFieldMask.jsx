import InputMask from "react-input-mask"
import PropTypes from "prop-types"
import { TextField } from "."

export const TextFieldMask = ({ mask, ...props }) => 
  <InputMask mask={mask} {...props} />
    {inputProps => <TextField {...inputProps} />} 
    
TextFieldMask.propTypes = {
  mask: PropTypes.string.isRequired 
}
