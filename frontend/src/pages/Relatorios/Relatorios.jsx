import { AttachMoney, FilterAltOutlined, Groups3Outlined, SettingsInputAntennaOutlined, Speed, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material"
import { Box, IconButton, styled } from "@mui/material"
import { InfoCard } from "components"
import { StyledCardsBox } from "pages/Dashboard"
import { useState } from "react"
import logo from 'assets/logo.png'
import { SimpleFilter } from "./SimpleFilter"
import { AdvancedFilter } from "./AdvancedFilter"


const StyledFilterContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  width: 750px;
  height: 60vh;
  background-color: #7663F1;
  border-radius: 16px;
`

const StyledLogo = styled(Box)`
  top: -30px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B07FEE;
  border-radius: 50%;
  font-size: 50px;
  width: 100px;
  height: 100px;
`

const StyledIconButton = styled(IconButton)`
  top: 30px;
  left: 650px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 50px;
  &:hover {
    background-color: #B07FEE;
  }
`


export const Relatorios = () => {
  const [isAdvancedFilter, setIsAdvancedFilter] = useState(false)
  const [cardData] = useState([
    {
      icon: <AttachMoney />,
      title: "Total de Vendas",
      value: "R$0,00"
    },
    {
      icon: <Speed />,
      title: "Conversão (%)",
      value: "0%"
    },
    {
      icon: <ThumbUpOutlined />,
      title: "Conquistados",
      value: "0"
    },
    {
      icon: <Groups3Outlined />,
      title: "Conquistados",
      value: "0"
    },
    {
      icon: <SettingsInputAntennaOutlined />,
      title: "Total Oportunidades",
      value: "0"
    },
    {
      icon: <ThumbDownOutlined />,
      title: "Total Perdidos",
      value: "0"
    }
  ])
  
  return (
    <Box alignItems="center" display="flex" flexDirection="column">
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