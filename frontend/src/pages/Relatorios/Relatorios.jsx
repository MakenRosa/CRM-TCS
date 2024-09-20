import { FilterAltOutlined } from "@mui/icons-material"
import { Box } from "@mui/material"
import { useState } from "react"
import logo from 'assets/logo.png'
import { SimpleFilter } from "./SimpleFilter"
import { AdvancedFilter } from "./AdvancedFilter"
import { StyledFilterContainer, StyledIconButton, StyledLogo } from "./Relatorios.styles"

export const Relatorios = () => {
  const [isAdvancedFilter, setIsAdvancedFilter] = useState(false)
  
  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <StyledFilterContainer>
        <StyledLogo>
          <img alt="Logo" src={logo} style={{ height: "130%" }} />
        </StyledLogo>
        <StyledIconButton onClick={() => setIsAdvancedFilter(true)} sx={{ visibility: isAdvancedFilter ? "hidden" : "visible" }}>
          <FilterAltOutlined fontSize="large" sx={{ color: "#fff" }} />
        </StyledIconButton>
        {!isAdvancedFilter ? (
          <SimpleFilter />
        ) : (
          <AdvancedFilter setIsAdvancedFilter={setIsAdvancedFilter} />
        )}
      </StyledFilterContainer>
    </Box>
  )
}