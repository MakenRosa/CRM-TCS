/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { FunilContainer, NivelFunil, StyledFunnel, ValorFunil } from './Funnel.styles'

export const Funnel = ({ data, valorVendas }) => {
  const { total_leads, total_prospeccoes, total_propostas, total_venda } = data

  return (
    <StyledFunnel alignItems="flex-end" display="flex" flexDirection="row" height="100%" justifyContent="center" width="100%">
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
        <Typography>Valores<br />{valorVendas}</Typography>
      </ValorFunil>
    </StyledFunnel>
  )
}

Funnel.propTypes = {
  data: PropTypes.object.isRequired,
  valorVendas: PropTypes.number.isRequired
}
