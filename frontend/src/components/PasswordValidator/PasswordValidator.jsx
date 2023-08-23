import React from 'react'
import PropTypes from 'prop-types'
import { validatePasswordTraits } from 'utils'
import { CheckCircle, Cancel } from '@mui/icons-material'
import { Box } from '@mui/material'

const flexStyle = {
  display: 'flex',
  alignItems: 'center'
}

const CheckedIcon = () => <CheckCircle sx={[{ color: 'green' }, { fontSize: '20px' }]} />

const UncheckedIcon = () => <Cancel sx={[{ color: 'red' }, { fontSize: '20px' }]} />

export const PasswordValidator = ({ password, ...props }) => {
  const traits = validatePasswordTraits(password)
  return (
    <Box {...props}>
      <p style={flexStyle}>{traits[0] ? <CheckedIcon /> : <UncheckedIcon />} Maiúscula</p>
      <p style={flexStyle}>{traits[1] ? <CheckedIcon /> : <UncheckedIcon />} Minúscula</p>
      <p style={flexStyle}>{traits[2] ? <CheckedIcon /> : <UncheckedIcon />} Número</p>
      <p style={flexStyle}>{traits[3] ? <CheckedIcon /> : <UncheckedIcon />} Pelo menos 8 caracteres</p>
    </Box>
  )
}

PasswordValidator.propTypes = {
  password: PropTypes.string.isRequired
}  