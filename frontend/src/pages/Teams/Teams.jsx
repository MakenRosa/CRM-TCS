import { Box } from "@mui/material"
import { Button, StyledRegisterBox, StyledRegisterContainer, StyledRegisterForm, StyledRegisterTitle } from "components"

export const Teams = () => (
  <StyledRegisterContainer>
    <StyledRegisterTitle>Equipes Cadastradas</StyledRegisterTitle>
    <StyledRegisterForm>
      <StyledRegisterBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <Box>
          <Box>
            <h1>Equipe 1</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box>
                <p>Nome do integrante 1</p>
                <p>Nome do integrante 2</p>
                <p>Nome do integrante 3</p>
              </Box>
              <Box>
                <p>Email do integrante 1</p>
                <p>Email do integrante 2</p>
                <p>Email do integrante 3</p>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Button variant="primary">Editar</Button>
                <Button variant="secondary">Excluir</Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <h1>Equipe 2</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box>
                <p>Nome do integrante 1</p>
                <p>Nome do integrante 2</p>
                <p>Nome do integrante 3</p>
              </Box>
              <Box>
                <p>Email do integrante 1</p>
                <p>Email do integrante 2</p>
                <p>Email do integrante 3</p>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Button variant="primary">Editar</Button>
                <Button variant="secondary">Excluir</Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <h1>Equipe 3</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box>
                <p>Nome do integrante 1</p>
                <p>Nome do integrante 2</p>
                <p>Nome do integrante 3</p>
              </Box>
              <Box>
                <p>Email do integrante 1</p>
                <p>Email do integrante 2</p>
                <p>Email do integrante 3</p>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Button variant="primary">Editar</Button>
                <Button variant="secondary">Excluir</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledRegisterBox>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }}>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="primary">Excluir</Button>
      </Box>
    </StyledRegisterForm>
  </StyledRegisterContainer>
  )