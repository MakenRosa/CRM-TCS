import PropTypes from 'prop-types'
import { StyledButton } from '.'


// Componente Button que aceita children, disabled e outros props
export const Button = ({ children, disabled, variant, ...props }) => 
  <StyledButton disabled={disabled} variant={variant} {...props}>
    {children} 
  </StyledButton>

// Definindo os tipos de propriedades esperados
Button.propTypes = {
  children: PropTypes.node.isRequired, // Conteúdo dentro do botão (como texto ou ícones)
  disabled: PropTypes.bool, // Indica se o botão está desabilitado
  variant: PropTypes.string // Indica a variante do botão (contained, outlined, text)
}
