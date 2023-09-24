import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import { Button } from 'components'
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProspeccao } from "utils"
import { KanbanBoard } from './components/KanbanBoard'
import { StyledBar, StyledFilterListOutlinedIcon } from './prospeccao.styles'

export const Prospeccao = () => {
  const [filter, setFilter] = useState('Todas as oportunidades')
  const [classificacao, setClassificacao] = useState('Data de criação')
  const [prospeccoes, setProspeccoes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getProspeccao()
      .then(response => {
        setProspeccoes(response.data.data.prospeccoes)
      })
  }, [])



  const handleNewProspeccao = useCallback(() => {
    localStorage.removeItem('leadToProspect')
    navigate('/oportunidades/register')
  }, [])


  const handleFilterChange = useCallback(event => {
    setFilter(event.target.value)
  }, [])

  const filterMenuItems = [
    "Todas as oportunidades",
    "Oportunidades abertas",
    "Oportunidades ganhas",
    "Oportunidades perdidas"
  ]

  const sortMenuItems = [
    "Data de criação",
    "Data de atualização"
  ]

  return (
    <Box sx={{ margin: '20px' }}>
      <StyledBar>
        <FormControl sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'row' }} variant="standard">
          <StyledFilterListOutlinedIcon />
          <Select
            onChange={handleFilterChange}
            sx={{ width: '200px' }}
            value={filter}
          >
            {filterMenuItems.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          <SortOutlinedIcon sx={{ color: '#000', fontSize: '30px' }} />
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
        <KanbanBoard boardData={prospeccoes} />
      </Box>
    </Box>
  )
}