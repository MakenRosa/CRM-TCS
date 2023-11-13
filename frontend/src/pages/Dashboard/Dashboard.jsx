import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { InsertChartOutlined, TroubleshootOutlined } from '@mui/icons-material'
import { getMenuBi } from 'utils'
import { Funnel } from './Funnel'
import { AnalyticsDashboard } from './AnalyticsDashboard/AnalyticsDashboard '

export const Dashboard = () => {
  const [dataFunnel, setDataFunnel] = useState({})
  const [data, setData] = useState({})

  const user_id = sessionStorage.getItem('user_id')

  useEffect(() => {
    const fetchMenuBI = async () => {
      const response = await getMenuBi(user_id)
      if (response && response.data) {
        if (response.data.funil) {
          const { funil } = response.data
          setDataFunnel({
            total_leads: funil.total_leads,
            total_prospeccoes: funil.total_prospeccoes,
            total_propostas: funil.total_propostas,
            total_venda: funil.total_venda
          })
        }

        setData(response.data)
        console.log(response.data)
      }
    }
    fetchMenuBI()
  }, [user_id])

  return (
    <Box display="flex" flexDirection="column" height="80vh" marginTop="20px" width="100%">
      <Box display="flex" flexDirection="row" justifyContent="space-around" width="100%">
        <Box textAlign="center" width="40%">
          <Typography borderBottom="2px solid #2E1F92" color="#5038ED" marginBottom="20px" variant="h4" width="100%">
            <InsertChartOutlined />
            Funil
          </Typography> 
          <Box display="flex" justifyContent="center" marginLeft="40px" width="100%">
            <Funnel data={dataFunnel} valorVendas={220} />
          </Box>
        </Box>
        <Box width="55%">
          <Typography borderBottom="2px solid #2E1F92" color="#5038ED" marginBottom="20px" textAlign="center" variant="h4" width="100%">
            <TroubleshootOutlined />
            Índices
          </Typography>
          <Box>
            <AnalyticsDashboard data={data} />
          </Box>
        </Box>
      </Box>
      <Box />
    </Box>
  )
}