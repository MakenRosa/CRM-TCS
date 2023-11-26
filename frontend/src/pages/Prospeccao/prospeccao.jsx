import { Box, FormControl, InputLabel, MenuItem, Select, IconButton } from "@mui/material"
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import { Button } from 'components'
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProspeccao } from "utils"
import { KanbanBoard } from './components/KanbanBoard'
import { StyledBar } from './prospeccao.styles'

const parseDate = dateString => {
  if (!dateString) {return null} // ou uma data padrão, se apropriado
  const parts = dateString.split('/')
  return new Date(parts[2], parts[1] - 1, parts[0])
}

export const Prospeccao = () => {
  const [classificacao, setClassificacao] = useState('Data de criação')
  const [sortDirection, setSortDirection] = useState('descendente')
  const [prospeccoes, setProspeccoes] = useState([])

  const user_id = sessionStorage.getItem('user_id')
  const navigate = useNavigate()

  const toggleSortDirection = () => {
    setSortDirection(prevDirection => (prevDirection === 'descendente' ? 'ascendente' : 'descendente'))
  }

  const sortProspeccoes = () => {
    const sortedProspeccoes = [...prospeccoes]
    // eslint-disable-next-line no-magic-numbers
    const multiplier = sortDirection === 'descendente' ? -1 : 1
    sortedProspeccoes.sort((a, b) => {
      let dateA = null
      let dateB = null
      switch (classificacao) {
        case 'Data de criação':
          dateA = parseDate(a.data_inicio_prospeccao)
          dateB = parseDate(b.data_inicio_prospeccao)
          break
        case 'Data de contato inicial':
          dateA = parseDate(a.data_contato_inicial)
          dateB = parseDate(b.data_contato_inicial)
          break
        case 'Data da próxima ação':
          dateA = parseDate(a.data_proxima_acao)
          dateB = parseDate(b.data_proxima_acao)
          break
        default:
          break
      }
      return (dateA - dateB) * multiplier
    })

  
    setProspeccoes(sortedProspeccoes)
  }

  useEffect(() => {
    getProspeccao(user_id)
      .then(response => {
        const fetchedProspeccoes = response.data.data.prospeccoes
        setProspeccoes(fetchedProspeccoes)
      })
  }, [user_id])

  useEffect(() => {
    sortProspeccoes()
  }, [classificacao, sortDirection, prospeccoes])

  const handleNewProspeccao = useCallback(() => {
    localStorage.removeItem('leadToProspect')
    localStorage.removeItem('edit_prospeccao')
    navigate('/oportunidades/register')
  }, [])

  const sortMenuItems = [
    "Data de criação",
    "Data de contato inicial",
    "Data da próxima ação"
  ]

  const handleUpdateBoardData = newBoardData => {
    const updatedProspeccoes = newBoardData.flatMap(column =>
        column.cards.map(card => ({
            ...card, 
            status: column.title,
            id: card.id,
            nome_negocio: card.label,
            observacao: card.description,
            data_proxima_acao: card.date,
            lead: card.leadId
        }))
    )
    setProspeccoes(updatedProspeccoes)
}
  
  return (
    <Box sx={{ margin: '20px' }}>
      <StyledBar>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <InputLabel sx={{ color: '#000' }}>Classificar por</InputLabel>
          <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
            <Select
              onChange={event => setClassificacao(event.target.value)}
              sx={{ width: '200px' }}
              value={classificacao}
            >
              {sortMenuItems.map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={toggleSortDirection} sx={{ transform: sortDirection === 'descendente' ? 'none' : 'scaleY(-1)' }}>
            <SortOutlinedIcon sx={{ color: '#000', fontSize: '30px' }} />
          </IconButton>
        </Box>
        <Box>
          <Button 
            onClick={handleNewProspeccao}
            variant="primary"
          >Nova Prospecção
          </Button>
        </Box>
      </StyledBar>
      <Box>
        <KanbanBoard boardData={prospeccoes} onUpdateBoardData={handleUpdateBoardData} />
      </Box>
    </Box>
  )
}