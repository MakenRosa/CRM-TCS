import { TextField as FieldMui, InputAdornment, styled } from "@mui/material"
import PropTypes from "prop-types"

// StyledTextField é um campo de texto customizado com estilos específicos
const StyledTextField = styled(FieldMui)`
  .MuiFilledInput-underline:before,
  & .MuiFilledInput-underline:after {
    display: none; // Remove o sublinhado padrão
  }

  > div {
    border-radius: ${ props => props.borderRadius || "16px" }; // Configura o raio da borda, padrão de 16px
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

// Componente TextField com suporte para ícones e personalização de estilo
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
      startAdornment: <InputAdornment position={position}>{icon}</InputAdornment> // Ícone opcional no início ou no fim do campo
    }}
      autoComplete="off"
      fullWidth={fullWidth} // Controla se o campo deve ocupar toda a largura
      onChange={onChange} // Função chamada quando o valor do campo muda
      type={type} // Tipo do campo, como 'text', 'password', etc.
      value={value}
      {...props}
    />


TextField.propTypes = {
  fullWidth: PropTypes.bool,
  icon: PropTypes.node, // Ícone opcional para ser exibido no campo
  onChange: PropTypes.func,
  position: PropTypes.oneOf(["start", "end"]), // Posição do ícone: no início ou no fim do campo
  type: PropTypes.string,
  value: PropTypes.string
}
