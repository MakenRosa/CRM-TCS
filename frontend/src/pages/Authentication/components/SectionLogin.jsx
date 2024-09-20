import PropTypes from "prop-types"
import { Typography, styled } from "@mui/material"
import { StyledSection } from "."

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingTop: '20px',
  marginTop: '-40px',
  marginBottom: '40px',
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    marginTop: '-20px',
    marginBottom: '20px',
    paddingTop: '40px'
  }

}))

export const SectionLogin = ({ title, h, children }) => (
  <StyledSection height={h}>
    <StyledTitle component="h1" gutterBottom variant="h4">{title}</StyledTitle>
    {children} 
  </StyledSection>
  )

SectionLogin.propTypes = {
  children: PropTypes.node.isRequired, 
  h: PropTypes.string,
  title: PropTypes.string.isRequired 
}

SectionLogin.defaultProps = {
  h: "60%" 
}