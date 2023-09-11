import { PropTypes } from 'prop-types'
import { StyledCard, StyledCardBox, StyledCardIcon, StyledCardTitle, StyledCardValue } from '.'

export const DashboardCard = ({ title, value, icon, color }) => (
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
)

DashboardCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
