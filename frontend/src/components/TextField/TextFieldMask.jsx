import InputMask from "react-input-mask"
import PropTypes from "prop-types"
import { TextField } from "."

// Componente TextFieldMask que aplica uma máscara de entrada ao componente TextField
export const TextFieldMask = ({ mask, ...props }) => 
  <InputMask mask={mask} {...props} />
    {inputProps => <TextField {...inputProps} />} // Aplica as propriedades da máscara ao componente TextField

TextFieldMask.propTypes = {
  mask: PropTypes.string.isRequired // A máscara de entrada, como "999-999", onde '9' representa um dígito
}
