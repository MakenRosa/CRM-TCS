import { toast } from "react-toastify"

const MIN_PASSWORD_LENGTH = 8 // Tamanho mínimo da senha

// Função principal para validar o formulário
const isValidForm = ({ email, senha, confirmSenha }) => validateEmail(email) && validatePassword(senha) && validateConfirmPassword(senha, confirmSenha)

// Validação de email utilizando regex
const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(email)) {
    return true
  }
  toast.error('Email inválido')
  return false
}

// Verifica se a senha contém uma letra maiúscula
const hasUpperCase = password => /[A-Z]/.test(password)

// Verifica se a senha contém uma letra minúscula
const hasLowerCase = password => /[a-z]/.test(password)

// Verifica se a senha contém um número
const hasNumber = password => /\d/.test(password)

// Verifica se a senha tem o tamanho mínimo requerido
const hasLength = password => password.length >= MIN_PASSWORD_LENGTH

// Validação da senha com base em múltiplos critérios
const validatePassword = password => {
  if(hasUpperCase(password) &&
         hasLowerCase(password) &&
         hasNumber(password) &&
         hasLength(password)) {
    return true
  }
  toast.error('A senha deve cumprir os requisitos mínimos')
  return false
}

// Retorna um array de booleanos representando se a senha atende a certas características
const validatePasswordTraits = password => {
  const traits = [
    hasUpperCase(password),
    hasLowerCase(password),
    hasNumber(password),
    hasLength(password)
  ]
  return traits
}

// Valida se a senha e a confirmação da senha são iguais
const validateConfirmPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true
  }
  toast.error('As senhas não coincidem')
  return false
}

export { validatePasswordTraits, isValidForm }
