export const { styled, Box } = require("@mui/material")

export const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    gap: 1
  }
}))

export const GraficosContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: "20px"
  }
}))

export const GraficoBarraContainer = styled(Box)(({ theme }) => ({
  width: '40%',
  maxWidth: '600px',
  height: '300px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '300px',
    maxWidth: '100%'
  }
}))

export const GraficoPizzaContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '300px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    paddingBottom: '20px'
  }
}))