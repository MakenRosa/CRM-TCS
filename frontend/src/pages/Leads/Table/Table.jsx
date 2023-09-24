/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types'
import { Box, Checkbox, FormControlLabel, Paper, Switch, Table as MuiTable, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getComparator, stableSort, TableHead } from '.'

export const Table = ({ page, setPage, rows, headCells, order, orderBy, onRequestSort, selectedLeads, setSelectedLeads }) => {
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    localStorage.setItem('selectedLeads', JSON.stringify(selectedLeads))
  }, [selectedLeads])

  const handleRequestSort = useCallback((event, property) => {
    onRequestSort(event, property)
  }, [onRequestSort])

  const handleSelectAllClick = useCallback(event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n)
      setSelectedLeads(newSelected)
      return
    }
    setSelectedLeads([])
  }, [rows, setSelectedLeads])

  const handleClick = useCallback((event, row) => {
    const selectedIndex = selectedLeads.findIndex(r => r.cnpj === row.cnpj)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...selectedLeads, row]
    } else {
      newSelected = [...selectedLeads]
      newSelected.splice(selectedIndex, 1)
    }

    setSelectedLeads(newSelected)
  }, [selectedLeads, setSelectedLeads])

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [setPage])

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }, [setPage, setRowsPerPage])

  const handleChangeDense = useCallback(event => {
    setDense(event.target.checked)
  }, [setDense])

  const isSelected = row => selectedLeads.some(selectedRow => selectedRow.cnpj === row.cnpj)

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <MuiTable
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            sx={{ minWidth: 750 }}
          >
            <TableHead
              headCells={headCells}
              numSelected={selectedLeads.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row)
              const labelId = `enhanced-table-checkbox-${ index }`

              return (
                <TableRow
                  aria-checked={isItemSelected}
                  hover
                  key={row.cnpj}
                  onClick={event => handleClick(event, row)}
                  role="checkbox"
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                  tabIndex={-1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      color="primary"
                      inputProps={{
                        'aria-labelledby': labelId
                      }}
                      onChange={event => event.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    padding="none"
                    scope="row"
                  >
                    {row.nomeEmpresa}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.telefone}</TableCell>
                  <TableCell align="left">{row.responsavel}</TableCell>
                  <TableCell align="left">{row.origem}</TableCell>
                  <TableCell align="left">{row.data_cadastro}</TableCell>
                  <TableCell align="left">{row.cnpj}</TableCell>
                </TableRow>
              )
            })}
              {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ color: 'var(--secondary-color)' }}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Tabela compacta"
      />
    </Box>
  )
}

Table.propTypes = {
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      disablePadding: PropTypes.bool,
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      nomeEmpresa: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      telefone: PropTypes.string.isRequired,
      responsavel: PropTypes.string.isRequired,
      origem: PropTypes.string.isRequired,
      data_cadastro: PropTypes.string.isRequired,
      cnpj: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedLeads: PropTypes.arrayOf(
    PropTypes.shape({
      nomeEmpresa: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      telefone: PropTypes.string.isRequired,
      responsavel: PropTypes.string.isRequired,
      origem: PropTypes.string.isRequired,
      data_cadastro: PropTypes.string.isRequired,
      cnpj: PropTypes.string.isRequired
    })
  ).isRequired,
  setPage: PropTypes.func.isRequired,
  setSelectedLeads: PropTypes.func.isRequired
}
