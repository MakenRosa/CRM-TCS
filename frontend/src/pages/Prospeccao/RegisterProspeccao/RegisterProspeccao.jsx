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
import {  CircularProgress, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProspeccao, getLeads, getUniqueProspeccao, updateProspeccao, validateProspection } from "utils"
import { toast } from "react-toastify"
import { StyledRegisterProspeccaoSection, StyledSectionTitle } from "./RegisterProspeccao.styles"

const formatDate = date => {
  if (date) {
    const dateParts = date.split('/')
    return `${ dateParts[2] }-${ dateParts[1] }-${ dateParts[0] }`
  }
  return ''
}

export const RegisterProspeccao = () => {
  const idProspeccao = JSON.parse(localStorage.getItem('edit_prospeccao'))
  const leadToProspect = JSON.parse(localStorage.getItem('leadToProspect'))

  const [prospeccao, setProspeccao] = useState()
  const [leads, setLeads] = useState([])
  const [nomeNegocio, setNomeNegocio] = useState(prospeccao?.nome_negocio || '')
  const [lead, setLead] = useState(leadToProspect?.id || prospeccao?.lead || '')
  const [segmento, setSegmento] = useState(prospeccao?.segmento || '')
  const [status, setStatus] = useState(prospeccao?.status || 'Em prospecção' || '' )
  const [servicosProdutos, setServicosProdutos] = useState(prospeccao?.servicos_produtos || '')
  const [participacaoComercial, setParticipacaoComercial] = useState(prospeccao?.participacao_comercial || '')
  const [participacaoEfetiva, setParticipacaoEfetiva] = useState(prospeccao?.participacao_efetiva || '')
  const [consultor, setConsultor] = useState(prospeccao?.consultor || '')
  const [dataInicioProspeccao, setDataInicioProspeccao] = useState(formatDate(prospeccao?.data_inicio_prospeccao) || new Date().toISOString())
  const [dataContatoInicial, setDataContatoInicial] = useState(formatDate(prospeccao?.data_contato_inicial) || new Date().toISOString())
  const [dataProximaAcao, setDataProximaAcao] = useState(formatDate(prospeccao?.data_proxima_acao) || new Date().toISOString())
  const [preferenciaContato, setPreferenciaContato] = useState(prospeccao?.preferencia_contato || '')
  const [horarioContato, setHorarioContato] = useState(prospeccao?.horario_contato || '')
  const [observacoesAdicionais, setObservacoesAdicionais] = useState(prospeccao?.observacao || '')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProspeccao = async () => {
      if (idProspeccao) {
        try {
          const response = await getUniqueProspeccao(idProspeccao)
          const data = response.data.data.prospecção

          setProspeccao(data)
          setNomeNegocio(data.nome_negocio)
          setLead(data.lead)
          setStatus(data.status)
          setSegmento(data.segmento)
          setServicosProdutos(data.servicos_produtos)
          setParticipacaoComercial(data.participacao_comercial)
          setParticipacaoEfetiva(data.participacao_efetiva)
          setConsultor(data.consultor)
          setDataInicioProspeccao(formatDate(data.data_inicio_prospeccao) || new Date().toISOString())
          setDataContatoInicial(formatDate(data.data_contato_inicial) || new Date().toISOString())
          setDataProximaAcao(formatDate(data.data_proxima_acao) || '')
          setPreferenciaContato(data.preferencia_contato)
          setHorarioContato(data.horario_contato)
          setObservacoesAdicionais(data.observacao)

        } catch (error) {
          console.error("Erro ao buscar prospecção:", error)
        }
      }
    }

    fetchProspeccao()
  }, [idProspeccao])

  const [loading, setLoading] = useState(false)

  const handleNomeNegocio = event => setNomeNegocio(event.target.value)
  const handleLead = event => setLead(event.target.value)
  const handleSegmento = event => setSegmento(event.target.value)
  const handleServicosProdutos = event => setServicosProdutos(event.target.value)
  const handleParticipacaoComercial = event => setParticipacaoComercial(event.target.value)
  const handleParticipacaoEfetiva = event => setParticipacaoEfetiva(event.target.value)
  const handleConsultor = event => setConsultor(event.target.value)
  const handleDataInicioProspeccao = event => setDataInicioProspeccao(event.target.value)
  const handleDataContatoInicial = event => setDataContatoInicial(event.target.value)
  const handleDataProximaAcao = event => setDataProximaAcao(event.target.value)
  const handlePreferenciaContato = event => setPreferenciaContato(event.target.value)
  const handleHorarioContato = event => setHorarioContato(event.target.value)
  const handleObservacoesAdicionais = event => setObservacoesAdicionais(event.target.value)

  const user_id = sessionStorage.getItem('user_id')

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const data = {
      nome_negocio: nomeNegocio,
      lead,
      segmento,
      servicos_produtos: servicosProdutos,
      participacao_comercial: participacaoComercial,
      participacao_efetiva: participacaoEfetiva,
      consultor,
      data_inicio_prospeccao: new Date(`${ dataInicioProspeccao  }T12:00:00.000Z`).toLocaleDateString('pt-BR').replace(/\//g, '-'),
      data_contato_inicial: new Date(`${ dataContatoInicial  }T12:00:00.000Z`).toLocaleDateString('pt-BR').replace(/\//g, '-'),
      data_proxima_acao: new Date(`${ dataProximaAcao  }T12:00:00.000Z`).toLocaleDateString('pt-BR').replace(/\//g, '-'),
      preferencia_contato: preferenciaContato,
      horario_contato: horarioContato,
      observacao: observacoesAdicionais || '.',
      status
    }
    try {
      if (validateProspection(data)) {
        prospeccao?.id ? await updateProspeccao(prospeccao.id, data) : await createProspeccao(data)
        toast.success('Prospecção salva com sucesso!')
        navigate('/oportunidades')
      }
    } catch (error) {
      toast.error('Erro ao salvar prospecção!')
      console.error(error)
    } finally {
      setLoading(false)
    }
    
  }

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await getLeads(user_id)
      setLeads(response.data.data.leads)
    }
    fetchLeads()
  }, [])

  return (
    <StyledRegisterContainer>
      <StyledRegisterTitle variant="h1">{prospeccao?.id ? 'Editar' : 'Cadastrar'} Prospecção</StyledRegisterTitle>
      <StyledRegisterForm onSubmit={handleSubmit}>
        <StyledRegisterBox>
          <StyledRegisterSection>
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Informações Negócio</StyledSectionTitle>
              <StyledRegisterTextField label="Nome Negócio" onChange={handleNomeNegocio} size="small" value={nomeNegocio} />
              <StyledRegisterTextField label="Lead" onChange={handleLead} select size="small" value={lead} >
                {leads.map(itemLead => (
                  <MenuItem key={itemLead.cnpj} value={itemLead.id}>
                    {itemLead.nomeEmpresa}
                  </MenuItem>
                ))}
              </StyledRegisterTextField>
              <StyledRegisterTextField label="Segmento" onChange={handleSegmento} size="small" value={segmento} />
            </StyledRegisterProspeccaoSection>
            
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Possibilidades Comerciais</StyledSectionTitle>
              <StyledRegisterTextField label="Serviços/Produtos" onChange={handleServicosProdutos} size="small" value={servicosProdutos} />
            </StyledRegisterProspeccaoSection>

            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Dados Participação Comercial</StyledSectionTitle>
              <StyledRegisterTextField label="Participação Comercial" onChange={handleParticipacaoComercial} size="small" value={participacaoComercial} />
              <StyledRegisterTextField label="Participação Efetiva" onChange={handleParticipacaoEfetiva} size="small" value={participacaoEfetiva} />
              <StyledRegisterTextField label="Consultor" onChange={handleConsultor} size="small" value={consultor} />
            </StyledRegisterProspeccaoSection>
          </StyledRegisterSection>
          
          <StyledRegisterSection>
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Dados relevantes</StyledSectionTitle>
              <StyledRegisterTextField label="Data Início Prospecção" onChange={handleDataInicioProspeccao} size="small" type="date" value={dataInicioProspeccao} />
              <StyledRegisterTextField label="Data Contato Inicial" onChange={handleDataContatoInicial} size="small" type="date" value={dataContatoInicial} />
              <StyledRegisterTextField label="Data Próxima Ação" onChange={handleDataProximaAcao} size="small" type="date" value={dataProximaAcao} />
            </StyledRegisterProspeccaoSection>
            
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Canais de Comunicação</StyledSectionTitle>
              <StyledRegisterTextField label="Preferência de Contato" onChange={handlePreferenciaContato} size="small" value={preferenciaContato} />
              <StyledRegisterTextField label="Horário para Contato" onChange={handleHorarioContato} size="small" value={horarioContato} />
            </StyledRegisterProspeccaoSection>
            
            <StyledRegisterProspeccaoSection>
              <StyledSectionTitle align="center" variant="h6">Observações/Notas</StyledSectionTitle>
              <StyledRegisterTextField label="Observações adicionais" multiline onChange={handleObservacoesAdicionais} rows={5} size="small" value={observacoesAdicionais} />
            </StyledRegisterProspeccaoSection>
          </StyledRegisterSection>
        </StyledRegisterBox>

        <StyledButtonBox gap="40px">
          <Button href="/oportunidades">Cancelar</Button>
          <Button disabled={loading} onSubmit={handleSubmit} type="submit" variant="primary">
            {loading ? <CircularProgress color="inherit" size={24} /> : 'Salvar'}
          </Button>
        </StyledButtonBox>
      </StyledRegisterForm>
    </StyledRegisterContainer>
  )
}