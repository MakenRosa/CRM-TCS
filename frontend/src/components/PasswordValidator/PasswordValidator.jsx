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
  const { hasUpperCase, hasLowerCase, hasNumber, hasLength } = traits
  return (
    <StyledBox {...props}>
      <Trait title="Maiúscula" trait={hasUpperCase} />
      <Trait title="Minúscula" trait={hasLowerCase} />
      <Trait title="Número" trait={hasNumber} />
      <Trait title="Mínimo de 8 caracteres" trait={hasLength} />
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
