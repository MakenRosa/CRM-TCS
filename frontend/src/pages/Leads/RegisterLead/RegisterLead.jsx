import PropTypes from "prop-types"
import { StyledButtonBox  } from "pages"
import { Button, StyledRegisterBox, StyledRegisterContainer, StyledRegisterForm, StyledRegisterSection, StyledRegisterTextField, StyledRegisterTitle } from "components"
import { CircularProgress } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createLead, updateLead } from "utils"
import { toast } from "react-toastify"
import InputMask from "react-input-mask"

export const RegisterLead = () => {
  const navigate = useNavigate()
  const lead = JSON.parse(localStorage.getItem('selectedLeads'))?.[0]
  const [cnpj, setCnpj] = useState(lead?.cnpj || '')
  const [nomeEmpresa, setNomeEmpresa] = useState(lead?.nomeEmpresa || '')
  const [responsavel, setResponsavel] = useState(lead?.responsavel || '')
  const [email, setEmail] = useState(lead?.email || '')
  const [telefone, setTelefone] = useState(lead?.telefone || '')
  const [origem, setOrigem] = useState(lead?.origem || '')
  const [segmento, setSegmento] = useState(lead?.cargo || '')
  const [descricao, setDescricao] = useState(lead?.descricao || '')
  const [criado] = useState(lead?.criado ? new Date(lead?.criado).toLocaleDateString() : new Date().toLocaleDateString())
  const [atualizado, setAtualizado] = useState(lead?.atualizado ? new Date(lead?.atualizado).toLocaleDateString() : new Date().toLocaleDateString())
  const [loading, setLoading] = useState(false)

  const userId = sessionStorage.getItem('user_id')

  const handleCnpj = event => setCnpj(event.target.value)
  const handleEmpresa = event => setNomeEmpresa(event.target.value)
  const handleResponsavel = event => setResponsavel(event.target.value)
  const handleEmail = event => setEmail(event.target.value)
  const handleTelefone = event => setTelefone(event.target.value)
  const handleOrigem = event => setOrigem(event.target.value)
  const handleSegmento = event => setSegmento(event.target.value)
  const handleDescricao = event => setDescricao(event.target.value)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setAtualizado(new Date().toLocaleDateString())
    const saveLead = {
      "cnpj": cnpj.split('.').join('').split('/').join('').split('-').join(''),
      nomeEmpresa,
      responsavel,
      email,
      telefone,
      origem,
      "cargo": segmento,
      descricao,
      "user": userId
    }
    if (validateLead(saveLead)) {
      if (lead) {
        await updateLead(lead.cnpj, saveLead)
        .catch(() => {
          toast.error('Erro ao atualizar lead!')
        }
        )
      } else {
        await createLead(saveLead)
      }    
      navigate('/leads')
    } else {
      setLoading(false)
    }
  }

  return (
    <StyledRegisterContainer>
      <StyledRegisterTitle variant="h1">{lead ? 'Editar' : 'Cadastrar'} Lead</StyledRegisterTitle>
      <StyledRegisterForm>
        <StyledRegisterBox>
          <StyledRegisterSection>
            <InputMask label="CNPJ" mask={'99.999.999/9999-99'} onChange={handleCnpj} size="small" value={cnpj}>
              {inputProps => <StyledRegisterTextField {...inputProps} />}
            </InputMask>
            <StyledRegisterTextField label="Empresa" name="nomeEmpresa" onChange={handleEmpresa} size="small" value={nomeEmpresa} />
            <StyledRegisterTextField label="Responsável" name="responsavel" onChange={handleResponsavel} size="small" value={responsavel} />
            <StyledRegisterTextField label="E-mail" name="email" onChange={handleEmail} size="small" type="email" value={email} />
            <InputMask label="Telefone" mask={'(99) 99999-9999'} onChange={handleTelefone} size="small" value={telefone}>
              {inputProps => <StyledRegisterTextField {...inputProps} />}
            </InputMask>
            <StyledRegisterTextField label="Origem do Lead" name="origem" onChange={handleOrigem} size="small" value={origem} />
          </StyledRegisterSection>
          <StyledRegisterSection>
            <StyledRegisterTextField label="Segmento" name="segmento" onChange={handleSegmento} size="small" value={segmento} />
            <StyledRegisterTextField label="Descrição" multiline name="descricao" onChange={handleDescricao} rows={5} value={descricao} />
            <StyledRegisterTextField label="Criado em" name="criado" readOnly size="small" value={criado} />
            <StyledRegisterTextField label="Atualizado em" name="atualizado" readOnly size="small" value={atualizado} />
          </StyledRegisterSection>
        </StyledRegisterBox>
        <StyledButtonBox gap="40px">
          <Button href="/leads">Cancelar</Button>
          <Button disabled={loading} onClick={handleSubmit} type="submit" variant="primary">{loading ? <CircularProgress color="inherit" size={24} /> : 'Salvar'}</Button>
        </StyledButtonBox>
      </StyledRegisterForm>
    </StyledRegisterContainer>
  )
}

RegisterLead.propTypes = {
  lead: PropTypes.object
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