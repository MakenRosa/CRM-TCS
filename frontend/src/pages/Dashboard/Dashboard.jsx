import { MenuItem } from '@mui/material'
import { Button } from 'components'
import { useState } from 'react'
import { Filter } from '@mui/icons-material'
import { DashboardCard, StyledCardsBox, StyledDashboard, StyledFilter, StyledFilterBox, StyledLabel, StyledSelect } from '.'

export const Dashboard = () => {
  const [team, setTeam] = useState('Equipe Rocket')
  const [funnel, setFunnel] = useState('Todos')
  const [period, setPeriod] = useState('Diário')

  return (
    <StyledDashboard>
      <StyledFilterBox>
        <StyledFilter>
          <StyledLabel variant="p">
            Usuário/Equipe
          </StyledLabel>
          <StyledSelect onChange={e => setTeam(e.target.value)} value={team}>
            <MenuItem value="Equipe Rocket">Equipe Rocket</MenuItem>
          </StyledSelect>
        </StyledFilter>
        <StyledFilter>
          <StyledLabel variant="p">
            Funil
          </StyledLabel>
          <StyledSelect onChange={e => setFunnel(e.target.value)} value={funnel}>
            <MenuItem value="Todos">Todos</MenuItem>
          </StyledSelect>
        </StyledFilter>
        <StyledFilter>
          <StyledLabel variant="p">
            Período
          </StyledLabel>
          <StyledSelect onChange={e => setPeriod(e.target.value)} value={period}>
            <MenuItem value="Diário">Diário</MenuItem>
          </StyledSelect>
        </StyledFilter>
        <Button variant="primary">
          Limpar filtros
        </Button>
      </StyledFilterBox>
      <StyledCardsBox>
        <DashboardCard 
          icon={<Filter />}
          title="Total de vendas"
          value="0"
        />
        <DashboardCard 
          icon={<Filter />}
          title="Total de vendas"
          value="0"
        />
        <DashboardCard 
          icon={<Filter />}
          title="Total de vendas"
          value="0"
        />
      </StyledCardsBox>
    </StyledDashboard>
  )
}
