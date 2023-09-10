import PropTypes from 'prop-types'
import { validatePasswordTraits } from 'utils'
import { CheckCircle, Cancel } from '@mui/icons-material'
import { StyledBox, StyledParagraph } from '.'

const Trait = ({ trait, title }) => (
  <StyledParagraph>
    {trait ? <CheckedIcon /> : <UncheckedIcon />}
    {title}
  </StyledParagraph>
  )

const CheckedIcon = () => <CheckCircle sx={[{ color: 'green' }, { fontSize: '20px' }]} />
const UncheckedIcon = () => <Cancel sx={[{ color: 'red' }, { fontSize: '20px' }]} />

export const PasswordValidator = ({ password, ...props }) => {
  const traits = validatePasswordTraits(password)
  const [upperCase, lowerCase, number, length] = traits
  return (
    <StyledBox {...props}>
      <Trait title="Maiúscula" trait={upperCase} />
      <Trait title="Minúscula" trait={lowerCase} />
      <Trait title="Número" trait={number} />
      <Trait title="Mínimo de 8 caracteres" trait={length} />
    </StyledBox>
  )
}

Trait.propTypes = {
  title: PropTypes.string.isRequired,
  trait: PropTypes.bool.isRequired
}

PasswordValidator.propTypes = {
  password: PropTypes.string.isRequired
} 
