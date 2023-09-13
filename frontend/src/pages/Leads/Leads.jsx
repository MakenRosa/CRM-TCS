import { Search } from "@mui/icons-material"
import { Box, FormControl, InputBase, InputLabel, MenuItem, Select } from "@mui/material"
import { Button } from "components"
import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Table } from './Table'
import { headCells, rows } from "./data"
import { StyledButtonBox, StyledLeadsContainer, StyledFilterAltOutlined, StyledLeadsFilterBox, StyledFilterSearchBox, StyledIconButton, StyledInputPaper, StyledSearchFilter, StyledLeadsTitle } from "."


export const Leads = () => {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(true)
  const [filteredRows, setFilteredRows] = useState(rows)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('empresa')

  const navigate = useNavigate()

  const handleEditLead = () => {
    const selected = JSON.parse(localStorage.getItem('selectedLeads'))
    selected.length === 1 ? navigate(`/leads/register`) : 
    selected.length > 1 ? toast.error('Selecione apenas um lead para editar') :
    toast.error('Selecione um lead para editar')
  }

  const handleNewLead = () => {
    localStorage.removeItem('selectedLeads')
    navigate('/leads/register')
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const searchInputChanged = event => {
    setSearch(event.target.value)
    event.target.value.length > 0 ? setSearched(false) : setSearched(true)
  }

  const handleSearch = event => {
    event.preventDefault()
    filterRows()
    setSearched(true)
  }

  const filterRows = useCallback(() => {
    const lowercasedSearch = search.toLowerCase()
    const newFilteredRows = rows.filter(row => Object.values(row).some(value =>
        value.toString().toLowerCase().includes(lowercasedSearch)
      ))
    setFilteredRows(newFilteredRows)
  }, [search, rows])

  useEffect(() => {
    setPage(0)
  }, [filteredRows])
  
  return (
    <StyledLeadsContainer>
      <StyledLeadsTitle variant="h1">Leads/Contatos</StyledLeadsTitle>
      <StyledButtonBox>
        <Button>Excluir</Button>
        <Button onClick={handleEditLead}>Editar</Button>
        <Button onClick={handleNewLead} variant="primary">Novo</Button>
      </StyledButtonBox>
      <Box>
        <StyledFilterSearchBox>
          <StyledSearchFilter>
            <StyledInputPaper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <InputBase
                inputProps={{ 'aria-label': 'Procurar leads' }}
                onChange={searchInputChanged}
                placeholder="Pesquisar"
                sx={{ ml: 1, flex: 1 }}
              />
              <StyledIconButton aria-label="search" 
                onClick={handleSearch}
                searched={searched.toString()}
                type="submit"
              >
                <Search />
              </StyledIconButton>
            </StyledInputPaper>
            <StyledLeadsFilterBox>
              <StyledFilterAltOutlined />
              <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
                <InputLabel 
                  sx={{ fontWeight: 'bold' }}
                >Filtros
                </InputLabel>
                <Select
                  onChange={event => setFilter(event.target.value)}
                  value={filter}
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </StyledLeadsFilterBox>
          </StyledSearchFilter>
        </StyledFilterSearchBox>
        <Box>
          <Table 
            headCells={headCells} 
            key={search}
            onRequestSort={handleRequestSort} 
            order={order} 
            orderBy={orderBy}
            page={page}
            rows={filteredRows}
            setPage={setPage}
          />
        </Box>
      </Box>
    </StyledLeadsContainer>
  )
}
