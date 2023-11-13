/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types'
import { Box, Typography, styled } from '@mui/material'

const FunilContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px'
}))

const NivelFunil = styled(Box)(({ theme, width }) => ({
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

const ValorFunil = styled(Box)(({ theme }) => ({
  height: 'max-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#9081F1',
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: '5px 10px',
  marginLeft: '10px'
}))

export const Funnel = ({ data, valorVendas }) => {
  const { total_leads, total_prospeccoes, total_propostas, total_venda } = data

  return (
    <Box alignItems="flex-end" display="flex" flexDirection="row" height="100%" justifyContent="center" width="100%">
      <FunilContainer>
        <NivelFunil width={90}>
          <Typography fontWeight="bold">{total_leads}<br />Lead{total_leads > 1 && 's'}
          </Typography>
        </NivelFunil>
        <NivelFunil width={70}>
          <Typography fontWeight="bold">{total_prospeccoes}<br />Prospecç{total_prospeccoes > 1 ? 'ões' : 'ão'}</Typography>
        </NivelFunil>
        <NivelFunil width={50}>
          <Typography fontWeight="bold">{total_propostas}<br />Proposta{total_propostas > 1 && 's'}</Typography>
        </NivelFunil>
        <NivelFunil width={30}>
          <Typography fontWeight="bold">{total_venda}<br />Venda{total_venda > 1 && 's'}</Typography>
        </NivelFunil>
      </FunilContainer>
      <ValorFunil>
        <Typography>Valores<br />{valorVendas} mi</Typography>
      </ValorFunil>
    </Box>
  )
}

Funnel.propTypes = {
  data: PropTypes.object.isRequired,
  valorVendas: PropTypes.number.isRequired 
}
