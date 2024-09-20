import { Box, styled } from "@mui/material"

export const StyledDashboard = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: '80vh'
  }
}))

export const StyledDashboardContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

export const StyledDashboardFunnel = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}))

export const StyledDashboardGraphics = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}))

export const StyledFunnelBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
    marginBottom: '50px'
  }
}))