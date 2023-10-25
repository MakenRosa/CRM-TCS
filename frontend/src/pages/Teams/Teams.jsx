import { Box } from "@mui/material"
import { StyledRegisterBox, StyledRegisterContainer, StyledRegisterForm, StyledRegisterTitle } from "components"
import { useEffect, useState } from "react"
import { getTeam } from "utils"
import { Team } from "./Team/Team"
import { StyledTeams } from "./Teams.styles"

export const Teams = () => {
  const [teams, setTeams] = useState([])
  const [groupName, setGroupName] = useState()

  const user_id = sessionStorage.getItem('user_id')
  
  useEffect(() => {
    getTeam(user_id)
      .then(response => {
        setTeams(response.data.data.groups)
        setGroupName(response.data.data.nome_grupo)
      })
  }
  , [])

  return (
    <StyledRegisterContainer>
      <StyledRegisterTitle>Equipes Cadastradas</StyledRegisterTitle>
      <StyledRegisterForm>
        <StyledRegisterBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <StyledTeams>
            <Team team={teams} title={groupName} />
          </StyledTeams>
        </StyledRegisterBox>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem' }} />
      </StyledRegisterForm>
    </StyledRegisterContainer>
  )
}