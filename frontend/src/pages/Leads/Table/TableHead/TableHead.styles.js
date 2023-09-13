import { TableCell, TableHead, TableSortLabel, styled } from "@mui/material"

export const StyledTableHead = styled(TableHead)`
  background-color: rgba(247, 244, 244, 0.93);
  border: 1px solid black;
  border-bottom: 1px solid black;
  `

export const StyledHeadTableCell = styled(TableCell)`
  border-right: 1px solid black;
  border-bottom: 1px solid black; 

  @media (max-width: 512px) {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 8px;
    padding-right: 8px;
}
`

export const StyledTableSortLabel = styled(TableSortLabel)`
  color: var(--secondary-color);
  font-size: 16px;
  font-weight: bold;
`