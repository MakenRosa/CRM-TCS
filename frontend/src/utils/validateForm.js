const MIN_PASSWORD_LENGTH = 8

const isValidForm = ({ email, senha, confirmSenha }) => validateEmail(email) && validatePassword(senha) && validateConfirmPassword(senha, confirmSenha)

const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(email)) {
    return true
  }
  alert('Email inválido')
  return false
}

const hasUpperCase = password => /[A-Z]/.test(password)

const hasLowerCase = password => /[a-z]/.test(password)

const hasNumber = password => /\d/.test(password)

const hasLength = password => password.length >= MIN_PASSWORD_LENGTH

const validatePassword = password => {
  if(hasUpperCase(password) &&
         hasLowerCase(password) &&
         hasNumber(password) &&
         hasLength(password)) {
    return true
  }
  alert('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número')
  return false
}

const validatePasswordTraits = password => {
  const traits = [
    hasUpperCase(password),
    hasLowerCase(password),
    hasNumber(password),
    hasLength(password)
  ]
  return traits
}

const validateConfirmPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true
  }
  alert('As senhas não coincidem')
  return false
}

export { validatePasswordTraits, isValidForm }