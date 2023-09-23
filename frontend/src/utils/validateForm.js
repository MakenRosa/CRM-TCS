import { toast } from "react-toastify"

const MIN_PASSWORD_LENGTH = 8 

const isValidForm = ({ email, password: senha, re_password: confirmSenha }) => validateEmail(email) && validatePassword(senha) && validateConfirmPassword(senha, confirmSenha)

const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(email)) {
    return true
  }
  toast.error('Email inválido')
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
  toast.error('A senha deve cumprir os requisitos mínimos')
  return false
}

const validatePasswordTraits = password => {
  const traits = {
    hasUpperCase: hasUpperCase(password),
    hasLowerCase: hasLowerCase(password),
    hasNumber: hasNumber(password),
    hasLength: hasLength(password)
  }
  return traits
}

const validateConfirmPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true
  }
  toast.error('As senhas não coincidem')
  return false
}

const validateLead = lead => {
  const telefoneRegex = /^\([1-9]{2}\) [0-9]{5}-[0-9]{4}$/g
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  const CNPJ_LENGTH = 14

  if (!lead.cnpj) {
    toast.error('O campo CNPJ é obrigatório!')
    return false
  } else if (lead.cnpj.length !== CNPJ_LENGTH) {
    toast.error('O campo CNPJ está inválido!')
    return false
  }
  if (!lead.nomeEmpresa) {
    toast.error('O campo Empresa é obrigatório!')
    return false
  }
  if (!lead.responsavel) {
    toast.error('O campo Responsável é obrigatório!')
    return false
  }
  if (!lead.email) {
    toast.error('O campo E-mail é obrigatório!')
    return false
  }
  if (!emailRegex.test(lead.email)) {
    toast.error('O campo E-mail está inválido!')
    return false
  }
  if (!lead.telefone) {
    toast.error('O campo Telefone é obrigatório!')
    return false
  }
  if (!telefoneRegex.test(lead.telefone)) {
    toast.error('O campo Telefone está inválido!')
    return false
  }
  if (!lead.origem) {
    toast.error('O campo Origem do Lead é obrigatório!')
    return false
  }
  if (!lead.cargo) {
    toast.error('O campo Segmento é obrigatório!')
    return false
  }
  if (!lead.descricao) {
    toast.error('O campo Descrição é obrigatório!')
    return false
  }
  return true
}

export { validatePasswordTraits, isValidForm, validatePassword, validateConfirmPassword, validateLead }