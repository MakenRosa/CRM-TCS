import {
  StyledButtonBox
} from "pages"
import {
  Button,
  StyledRegisterBox,
  StyledRegisterContainer,
  StyledRegisterForm,
  StyledRegisterSection,
  StyledRegisterTextField,
  StyledRegisterTitle
} from "components"
import { Box, CircularProgress, Typography, styled } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const StyledRegisterProspeccaoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`

const StyledSectionTitle = styled(Typography)`
  color: var(--secondary-color);
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2;
`

export const RegisterProspeccao = () => {
  const navigate = useNavigate()
  // Campos da Prospecção
  const [nomeNegocio, setNomeNegocio] = useState('')
  const [lead, setLead] = useState('')
  const [segmento, setSegmento] = useState('')
  const [servicosProdutos, setServicosProdutos] = useState('')
  const [participacaoComercial, setParticipacaoComercial] = useState('')
  const [participacaoEfetiva, setParticipacaoEfetiva] = useState('')
  const [consultor, setConsultor] = useState('')
  const [dataInicioProspeccao, setDataInicioProspeccao] = useState(new Date().toISOString().slice())
  const [dataContatoInicial, setDataContatoInicial] = useState(new Date().toISOString().slice())
  const [dataProximaAcao, setDataProximaAcao] = useState(new Date().toISOString().slice())
  const [preferenciaContato, setPreferenciaContato] = useState('')
  const [horarioContato, setHorarioContato] = useState('')
  const [observacoesAdicionais, setObservacoesAdicionais] = useState('')
  const [loading, setLoading] = useState(false)

  // Handlers para campos
  // ... (handlers para cada campo)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    navigate('/oportunidades')
  }

  return (
    <StyledRegisterContainer>
      <StyledRegisterTitle variant="h1">Cadastro Prospecção</StyledRegisterTitle>
      <StyledRegisterForm onSubmit={handleSubmit}>
        <StyledRegisterBox>
          <StyledRegisterSection>
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Informações Negócio</StyledSectionTitle>
              <StyledRegisterTextField label="Nome Negócio" onChange={e => setNomeNegocio(e.target.value)} size="small" value={nomeNegocio} />
              <StyledRegisterTextField label="Lead" onChange={e => setLead(e.target.value)} select size="small" value={lead} >
                {/* Opções de Leads aqui */}
              </StyledRegisterTextField>
              <StyledRegisterTextField label="Segmento" onChange={e => setSegmento(e.target.value)} size="small" value={segmento} />
            </StyledRegisterProspeccaoSection>
            
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Possibilidades Comerciais</StyledSectionTitle>
              <StyledRegisterTextField label="Serviços/Produtos" onChange={e => setServicosProdutos(e.target.value)} size="small" value={servicosProdutos} />
            </StyledRegisterProspeccaoSection>

            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Dados Participação Comercial</StyledSectionTitle>
              <StyledRegisterTextField label="Participação Comercial" onChange={e => setParticipacaoComercial(e.target.value)} size="small" value={participacaoComercial} />
              <StyledRegisterTextField label="Participação Efetiva" onChange={e => setParticipacaoEfetiva(e.target.value)} size="small" value={participacaoEfetiva} />
              <StyledRegisterTextField label="Consultor" onChange={e => setConsultor(e.target.value)} size="small" value={consultor} />
            </StyledRegisterProspeccaoSection>
          </StyledRegisterSection>
          
          <StyledRegisterSection>
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Dados relevantes</StyledSectionTitle>
              <StyledRegisterTextField label="Data Início Prospecção" onChange={e => setDataInicioProspeccao(e.target.value)} size="small" type="date" value={dataInicioProspeccao} />
              <StyledRegisterTextField label="Data Contato Inicial" onChange={e => setDataContatoInicial(e.target.value)} size="small" type="date" value={dataContatoInicial} />
              <StyledRegisterTextField label="Data Próxima Ação" onChange={e => setDataProximaAcao(e.target.value)} size="small" type="date" value={dataProximaAcao} />
            </StyledRegisterProspeccaoSection>
            
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Canais de Comunicação</StyledSectionTitle>
              <StyledRegisterTextField label="Preferência de Contato" onChange={e => setPreferenciaContato(e.target.value)} size="small" value={preferenciaContato} />
              <StyledRegisterTextField label="Horário para Contato" onChange={e => setHorarioContato(e.target.value)} size="small" value={horarioContato} />
            </StyledRegisterProspeccaoSection>
            
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Observações/Notas</StyledSectionTitle>
              <StyledRegisterTextField label="Observações adicionais" multiline onChange={e => setObservacoesAdicionais(e.target.value)} rows={5} size="small" value={observacoesAdicionais} />
            </StyledRegisterProspeccaoSection>
          </StyledRegisterSection>
        </StyledRegisterBox>

        <StyledButtonBox gap="40px">
          <Button href="/prospeccoes">Cancelar</Button>
          <Button disabled={loading} onSubmit={handleSubmit} type="submit" variant="primary">
            {loading ? <CircularProgress color="inherit" size={24} /> : 'Salvar'}
          </Button>
        </StyledButtonBox>
      </StyledRegisterForm>
    </StyledRegisterContainer>
  )
}