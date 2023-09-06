import { PropTypes } from 'prop-types'
import { Box, Card, styled, Typography } from '@mui/material'

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 115px;
  max-width: 250px;
  background-color:  ${ ({ color }) => color || '#F3EFEF' };
  border: 1px solid #8F8B8B;
  color: black;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
`

const StyledCardTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 100%;
`

const StyledCardBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledCardValue = styled(Typography)`
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-right: 24px;
`

const StyledCardIcon = styled(Box)`
  display: flex;
`

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
  color: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
