import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { Box, Checkbox, TableRow } from '@mui/material'
import { StyledHeadTableCell, StyledTableHead, StyledTableSortLabel } from '.'

export const TableHead = ({
    headCells,
    order,
    orderBy,
    onRequestSort,
    numSelected,
    rowCount,
    onSelectAllClick
}) => {
    const createSortHandler = property => event => {
        onRequestSort(event, property)
    }

    return (
      <StyledTableHead>
        <TableRow>
          <StyledHeadTableCell padding="checkbox">
            <Checkbox
              checked={rowCount > 0 && numSelected === rowCount}
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              inputProps={{
                            'aria-label': 'select all leads'
                        }}
              onChange={onSelectAllClick}
            />
          </StyledHeadTableCell>
          {headCells.map(headCell => (
            <StyledHeadTableCell
              align="left"
              key={headCell.id}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <StyledTableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                            ) : null}
              </StyledTableSortLabel>
            </StyledHeadTableCell>
                ))}
        </TableRow>
      </StyledTableHead>
    )
}

TableHead.propTypes = {
    headCells: PropTypes.arrayOf(
        PropTypes.shape({
            disablePadding: PropTypes.bool,
            id: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
}