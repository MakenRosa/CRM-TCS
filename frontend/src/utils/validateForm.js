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
  // CNPJ without special characters
  const cnpjRegex = /^[0-9]{14}$/

  if (!lead.cnpj) {
    toast.error('O campo CNPJ é obrigatório!')
    return false
  } else if (!cnpjRegex.test(lead.cnpj)) {
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

const validateProspection = prospection => {
  const datePattern = /^\d{2}-\d{2}-\d{4}$/

  if (!datePattern.test(prospection.data_inicio_prospeccao)) {
    toast.error('A Data de início da prospecção é inválida!')
    return false
  }

  if (!datePattern.test(prospection.data_contato_incial)) {
    toast.error('A Data de contato inicial é inválida!')
    return false
  }

  if (!prospection.preferencia_contato || prospection.preferencia_contato.length < 1) {
    toast.error('A preferência de contato é obrigatória!')
    return false
  }

  if (!prospection.horario_contato || prospection.horario_contato.length < 1) {
    toast.error('O horário de contato é obrigatório!')
    return false
  }

  const fields = [
    { field: 'nome_negocio', minLength: 1, maxLength: 255, message: 'Nome do negócio' },
    { field: 'segmento', minLength: 1, maxLength: 255, message: 'Segmento' },
    { field: 'servicos_produtos', minLength: 1, maxLength: 255, message: 'Serviços/Produtos' },
    { field: 'participacao_comercial', minLength: 1, maxLength: 255, message: 'Participação comercial' },
    { field: 'participacao_efetiva', minLength: 1, maxLength: 255, message: 'Participação efetiva' },
    { field: 'consultor', minLength: 1, maxLength: 255, message: 'Consultor' }
  ]

  for (const { field, minLength, maxLength, message } of fields) {
    if (!prospection[field] || prospection[field].length < minLength || prospection[field].length > maxLength) {
      toast.error(`O campo ${ message } é obrigatório e deve ter entre ${ minLength } e ${ maxLength } caracteres!`)
      return false
    }
  }

  if (!datePattern.test(prospection.data_proxima_acao)) {
    toast.error('A Data da próxima ação é inválida!')
    return false
  }

  if (typeof prospection.lead !== 'number' || prospection.lead < 0) {
    toast.error('O lead deve ser um número válido!')
    return false
  }

  return true
}


export { validatePasswordTraits, isValidForm, validatePassword, validateConfirmPassword, validateLead, validateProspection }
