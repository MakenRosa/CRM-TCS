import { Box, Typography, styled } from '@mui/material'
import { useState } from 'react'
import { InsertChartOutlined, TroubleshootOutlined } from '@mui/icons-material'
import { Funnel } from './Funnel'
import { AnalyticsDashboard } from './AnalyticsDashboard/AnalyticsDashboard '

const StyledFunnelContainer = styled(Box)`
`

const StyledIndexContainer = styled(Box)`
`

const dataFunil = {
  total_leads: 1,
  total_prospeccoes: 1,
  total_propostas: 3,
  total_venda: 1
}

export const Dashboard = () => {
  const [data, setData] = useState(dataFunil)

  return (
    <Box display="flex" flexDirection="column" height="80vh" marginTop="20px" width="100%">
      <Box display="flex" flexDirection="row" justifyContent="space-around" width="100%">
        <StyledFunnelContainer textAlign="center" width="40%">
          <Typography borderBottom="2px solid #2E1F92" color="#5038ED" marginBottom="20px" variant="h4" width="100%">
            <InsertChartOutlined />
            Funil
          </Typography> 
          <Box display="flex" justifyContent="center" marginLeft="40px" width="100%">
            <Funnel data={data} valorVendas={220} />
          </Box>
        </StyledFunnelContainer>
        <StyledIndexContainer width="55%">
          <Typography borderBottom="2px solid #2E1F92" color="#5038ED" marginBottom="20px" textAlign="center" variant="h4" width="100%">
            <TroubleshootOutlined />
            Índices
          </Typography>
          <Box>
            <AnalyticsDashboard />
          </Box>
        </StyledIndexContainer>
      </Box>
      <Box>
        tabela
      </Box>
    </Box>
  )
}