import { PropTypes } from 'prop-types'
import { memo } from 'react'
import { StyledCard, StyledCardBox, StyledCardIcon, StyledCardTitle, StyledCardValue } from '.'

export const DashboardCard = memo(({ title, value, icon, color }) => (
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

DashboardCard.displayName = 'DashboardCard'

DashboardCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
