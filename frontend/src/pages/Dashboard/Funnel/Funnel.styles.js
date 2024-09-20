export const { styled, Box } = require("@mui/material")

export const StyledFunnel = styled(Box)(({ theme }) => ({
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export const FunilContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))

export const NivelFunil = styled(Box)(({ theme, width }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.background.paper,
  border: `1px solid #5038ED`,
  margin: '5px 0',
  width: `${ width }%`,
  color: '#5038ED',
  boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.11)'
}))

export const ValorFunil = styled(Box)(({ theme }) => ({
  height: 'max-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#9081F1',
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: '5px 10px',
  marginLeft: '10px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '10px',
    marginLeft: '0'
  }
}))