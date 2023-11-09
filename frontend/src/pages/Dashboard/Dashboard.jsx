import { MenuItem } from '@mui/material'
import { Button, InfoCard } from 'components'
import { useEffect, useState } from 'react'
import { AccountTree, Leaderboard, Person } from '@mui/icons-material'
import { getTotals } from 'utils'
import { StyledCardsBox, StyledDashboard, StyledFilter, StyledFilterBox, StyledLabel, StyledSelect } from '.'

export const Dashboard = () => {
  const [team, setTeam] = useState('Equipe Rocket')
  const [funnel, setFunnel] = useState('Todos')
  const [period, setPeriod] = useState('Diário')
  const [totals, setTotals] = useState({
    total_prospeccao: 0,
    total_negociacao: 0,
    total_lead: 0
  })
  

  const [cardData, setCardData] = useState([
    {
      icon: <AccountTree />,
      title: "Total de prospecções",
      value: "0"
    },
    {
      icon: <Person />,
      title: "Total de negociações",
      value: "0"
    },
    {
      icon: <Leaderboard />,
      title: "Total de leads",
      value: "0"
    }
  ])

  useEffect(() => {
    if (totals && typeof totals.total_prospeccao !== 'undefined' && typeof totals.total_negociacao !== 'undefined' && typeof totals.total_lead !== 'undefined') {
      setCardData(prevData => [
        {
          ...prevData[0],
          value: totals.total_prospeccao.toString()
        },
        {
          ...prevData[1],
          value: totals.total_negociacao.toString()
        },
        {
          ...prevData[2],
          value: totals.total_lead.toString()
        }
      ])
    }
  }, [totals])

  const user_id = sessionStorage.getItem('user_id')

  const ClearFilters = () => {
    setTeam('Equipe Rocket')
    setFunnel('Todos')
    setPeriod('Diário')
  }

  useEffect(() => {
    const getDashboardData = async () => {
      const response = await getTotals(user_id)
      setTotals(response.data.data)
    }
    getDashboardData()
  }
  , [])

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
          <InfoCard 
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
