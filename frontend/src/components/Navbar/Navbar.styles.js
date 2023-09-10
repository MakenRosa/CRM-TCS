import { Container, Typography, styled } from "@mui/material"

export const StyledNavTitle = styled(Typography)`
  font-family: monospace;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
`

export const StyledNavContainer = styled(Container)`
  background: var(--primary-gradient);
  @media (min-width: 1536px) {
    max-width: 100%;
  }
`
