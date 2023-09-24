import { MenuItem } from '@mui/material'
import { Button } from 'components'
import { useState } from 'react'
import { AccountTree, Leaderboard, Person } from '@mui/icons-material'
import { DashboardCard, StyledCardsBox, StyledDashboard, StyledFilter, StyledFilterBox, StyledLabel, StyledSelect } from '.'

const cardData = [
  {
    icon: <AccountTree />,
    title: "Total de prospecções",
    value: "23"
  },
  {
    icon: <Person />,
    title: "Total de clientes",
    value: "20"
  },
  {
    icon: <Leaderboard />,
    title: "Total de leads",
    value: "3"
  }
]

export const Dashboard = () => {
  const [team, setTeam] = useState('Equipe Rocket')
  const [funnel, setFunnel] = useState('Todos')
  const [period, setPeriod] = useState('Diário')

  const ClearFilters = () => {
    setTeam('Equipe Rocket')
    setFunnel('Todos')
    setPeriod('Diário')
  }

  return (
    <StyledDashboard>
      <StyledFilterBox>
        <StyledFilter>
          <StyledLabel variant="p">
            Usuário/Equipe
          </StyledLabel>
          <StyledSelect onChange={e => setTeam(e.target.value)} value={team}>
            <MenuItem value="Equipe Rocket">Equipe Rocket</MenuItem>
            <MenuItem value="Equipe Aqua">Equipe Aqua</MenuItem>
            <MenuItem value="Equipe Magma">Equipe Magma</MenuItem>
            <MenuItem value="Equipe Plasma">Equipe Plasma</MenuItem>
          </StyledSelect>
        </StyledFilter>
        <StyledFilter>
          <StyledLabel variant="p">
            Funil
          </StyledLabel>
          <StyledSelect onChange={e => setFunnel(e.target.value)} value={funnel}>
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Clientes">Clientes</MenuItem>
            <MenuItem value="Leads">Leads</MenuItem>
            <MenuItem value="Oportunidades">Oportunidades</MenuItem>
          </StyledSelect>
        </StyledFilter>
        <StyledFilter>
          <StyledLabel variant="p">
            Período
          </StyledLabel>
          <StyledSelect onChange={e => setPeriod(e.target.value)} value={period}>
            <MenuItem value="Diário">Diário</MenuItem>
            <MenuItem value="Semanal">Semanal</MenuItem>
            <MenuItem value="Mensal">Mensal</MenuItem>
            <MenuItem value="Anual">Anual</MenuItem>
          </StyledSelect>
        </StyledFilter>
        <Button onClick={() => ClearFilters()} variant="primary">
          Limpar filtros
        </Button>
      </StyledFilterBox>      
      <StyledCardsBox>
        {cardData.map((card, index) => (
          <DashboardCard 
            icon={card.icon}
            key={index}
            title={card.title}
            value={card.value}
          />
        ))}
      </StyledCardsBox>
    </StyledDashboard>
  )
}
