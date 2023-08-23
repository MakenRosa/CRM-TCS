import PropTypes from "prop-types"
import { StyledSection } from "pages"

// Componente SectionLogin para renderizar uma seção da página de login
export const SectionLogin = ({ title, h, children }) => {
  // Altura personalizada da seção
  const height = h

  return (
    <StyledSection height={height}>
      <h1>{title}</h1> {/* Título da seção */}
      {children} {/* Conteúdo personalizado da seção, como campos de entrada */}
    </StyledSection>
  )
}

SectionLogin.propTypes = {
  children: PropTypes.node.isRequired, // Conteúdo dentro da seção
  h: PropTypes.string, // Altura opcional da seção
  title: PropTypes.string.isRequired // Título obrigatório da seção
}
