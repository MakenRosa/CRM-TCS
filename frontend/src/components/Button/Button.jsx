import { Button as BtnMui, styled } from '@mui/material'
import PropTypes from 'prop-types'

// StyledButton é um botão customizado usando styled-components
const StyledButton = styled(BtnMui)`
`

// Componente Button que aceita children, disabled e outros props
export const Button = ({ children, disabled, ...props }) => 
  <StyledButton disabled={disabled} {...props}>
    {children} 
  </StyledButton>

// Definindo os tipos de propriedades esperados
Button.propTypes = {
  children: PropTypes.node.isRequired, // Conteúdo dentro do botão (como texto ou ícones)
  disabled: PropTypes.bool // Indica se o botão está desabilitado
}
