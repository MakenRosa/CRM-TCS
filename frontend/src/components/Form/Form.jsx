import { Box } from "@mui/material"
import PropTypes from "prop-types"

// Componente Form que estrutura um formulário com layout de coluna e espaçamento entre os elementos
export const Form = ({ children, sx, ...props }) => 
  <Box
    component="form"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      ...sx
    }}
    width="100%"
    {...props}
  >
    {children}
  </Box>

Form.propTypes = {
  children: PropTypes.node.isRequired, // Conteúdo dentro do formulário (como campos de entrada)
  sx: PropTypes.object // Estilos adicionais que podem ser aplicados ao componente
}

Form.defaultProps = {
  sx: {} // Define os estilos adicionais como um objeto vazio por padrão
}
