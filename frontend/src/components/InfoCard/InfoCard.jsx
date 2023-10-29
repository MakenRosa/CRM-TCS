import { PropTypes } from 'prop-types'
import { memo } from 'react'
import { StyledCard, StyledCardBox, StyledCardIcon, StyledCardTitle, StyledCardValue } from './InfoCard.styles'

export const InfoCard = memo(({ title, value, icon, color }) => (
  <StyledCard color={color}>
    <StyledCardTitle>
      {title}
    </StyledCardTitle>
    <StyledCardBox>
      <StyledCardIcon>
        {icon}
      </StyledCardIcon>
      <StyledCardValue>
        {value}
      </StyledCardValue>
    </StyledCardBox>
  </StyledCard>
  ))

InfoCard.displayName = 'InfoCard'

InfoCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
