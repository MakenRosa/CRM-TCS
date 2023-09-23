import PropTypes from "prop-types"
import { StyledButtonBox, StyledLeadsContainer, StyledLeadsTitle } from "pages"
import { Button } from "components"
import { CircularProgress } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createLead, updateLead, validateLead } from "utils"
import { toast } from "react-toastify"
import InputMask from "react-input-mask"
import { StyledRegisterBox, StyledRegisterForm, StyledRegisterSection, StyledLeadTextField } from "."

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
    try {
      if (validateLead(saveLead)) {
        if (lead) {
          await updateLead(lead.cnpj, saveLead)
        } else {
          await createLead(saveLead)
        }
        navigate('/leads')
      } else {
        setLoading(false)
      }
    } catch (error) {
      toast.error('Erro ao salvar lead!')
      setLoading(false)
    }
  }

  return (
    <StyledLeadsContainer>
      <StyledLeadsTitle variant="h1">{lead ? 'Editar' : 'Cadastrar'} Lead</StyledLeadsTitle>
      <StyledRegisterForm>
        <StyledRegisterBox>
          <StyledRegisterSection>
            <InputMask label="CNPJ" mask={'99.999.999/9999-99'} onChange={handleCnpj} size="small" value={cnpj}>
              {inputProps => <StyledLeadTextField {...inputProps} />}
            </InputMask>
            <StyledLeadTextField label="Empresa" name="nomeEmpresa" onChange={handleEmpresa} size="small" value={nomeEmpresa} />
            <StyledLeadTextField label="Responsável" name="responsavel" onChange={handleResponsavel} size="small" value={responsavel} />
            <StyledLeadTextField label="E-mail" name="email" onChange={handleEmail} size="small" type="email" value={email} />
            <InputMask label="Telefone" mask={'(99) 99999-9999'} onChange={handleTelefone} size="small" value={telefone}>
              {inputProps => <StyledLeadTextField {...inputProps} />}
            </InputMask>
            <StyledLeadTextField label="Origem do Lead" name="origem" onChange={handleOrigem} size="small" value={origem} />
          </StyledRegisterSection>
          <StyledRegisterSection>
            <StyledLeadTextField label="Segmento" name="segmento" onChange={handleSegmento} size="small" value={segmento} />
            <StyledLeadTextField label="Descrição" multiline name="descricao" onChange={handleDescricao} rows={5} value={descricao} />
            <StyledLeadTextField label="Criado em" name="criado" readOnly size="small" value={criado} />
            <StyledLeadTextField label="Atualizado em" name="atualizado" readOnly size="small" value={atualizado} />
          </StyledRegisterSection>
        </StyledRegisterBox>
        <StyledButtonBox gap="40px">
          <Button href="/leads">Cancelar</Button>
          <Button disabled={loading} onClick={handleSubmit} type="submit" variant="primary">{loading ? <CircularProgress color="inherit" size={24} /> : 'Salvar'}</Button>
        </StyledButtonBox>
      </StyledRegisterForm>
    </StyledLeadsContainer>
  )
}

RegisterLead.propTypes = {
  lead: PropTypes.object
}
