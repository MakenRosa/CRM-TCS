import { Box } from "@mui/material"
import { Button, StyledRegisterBox, StyledRegisterContainer, StyledRegisterForm, StyledRegisterTitle } from "components"
import { Team } from "./Team/Team"
import { mockTimes } from "./data"
import { StyledTeams } from "./Teams.styles"

export const Teams = () => (
  <StyledRegisterContainer>
    <StyledRegisterTitle>Equipes Cadastradas</StyledRegisterTitle>
    <StyledRegisterForm>
      <StyledRegisterBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <StyledTeams>
          {mockTimes.map((team, index) => (
            <Team key={index} team={team} />
          ))}
        </StyledTeams>
      </StyledRegisterBox>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }}>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="primary">Excluir</Button>
      </Box>
    </StyledRegisterForm>
  </StyledRegisterContainer>
  )
