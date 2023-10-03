import { Button, styled } from "@mui/material"

export const StyledButton = styled(Button)`
  ${ ({ variant }) => (variant === 'primary' ? primaryStyles : secondaryStyles) }
  border-radius: var(--border-radius, 8px);
`

const primaryStyles = `
  background: var(--primary-gradient);
  color: #fff;

  &:disabled {
    background: var(--primary-gradient-disabled);
    color: #fff;
  }
`

const secondaryStyles = `
  border: 1px solid var(--secondary-color);
  color: var(--secondary-color);

  &:disabled {
    border: 1px solid var(--secondary-color-disabled);
    color: var(--secondary-color-disabled);
  }
`
