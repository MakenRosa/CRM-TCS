/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react'
import { PropTypes } from "prop-types"
import { Modal, Box, MenuItem, Typography, TextField } from "@mui/material"
import { Button, StyledRegisterTextField } from "components"
import { createProposta, getUser } from 'utils'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { StyledActionArea, StyledColumn, StyledModalBox } from "./PropostaModal.styles"

export const PropostaModal = ({ open, handleClose, proposta, propostas, setPropostas }) => {
  const [nomeProposta, setNomeProposta] = useState(proposta?.nome_proposta || '')
  const [dataProposta, setDataProposta] = useState(proposta?.data_cadastro || new Date().toISOString().split('T')[0])
  const [descProposta, setDescProposta] = useState(proposta?.desc_proposta || '')
  const [consultorProp, setConsultorProp] = useState(proposta?.consultor_prop || sessionStorage.getItem('user_id') )
  const [consultor, setConsultor] = useState(fetchConsultor(proposta?.consultor_prop || sessionStorage.getItem('user_id')))
  const [tipoProjeto, setTipoProjeto] = useState(proposta?.tipo_projeto || '')
  const [influenciadorDecisor, setInfluenciadorDecisor] = useState(proposta?.influenciador_decisor || '')
  const [perfilOrcamento, setPerfilOrcamento] = useState(proposta?.perfil_orcamento || '')
  const [probFechamento, setProbFechamento] = useState(proposta?.prob_fechamento || '')
  const [statusProposta, setStatusProposta] = useState(proposta?.status_proposta || '')
  const [materialInsumo, setMaterialInsumo] = useState(proposta?.material_insumo || '')
  const [servicos, setServicos] = useState(proposta?.servicos || '')
  const [valorProposta, setValorProposta] = useState(proposta?.valor_proposta ?? 0)

  const { prospectId } = useParams()

  const handleValorPropostaChange = valorNumerico => {
    setValorProposta(valorNumerico) 
  }
  

  async function fetchConsultor (id_consultor) {
    try {
      const response = await getUser(id_consultor)
      setConsultor(`${ response.data.first_name  } ${  response.data.last_name }`)
    } catch (error) {
      toast.error('Erro ao buscar consultor')
    }
  }
  useEffect(() => {
    if (proposta) {
      fetchConsultor(proposta.consultor_prop || sessionStorage.getItem('user_id'))
      setConsultorProp(proposta.consultor_prop || sessionStorage.getItem('user_id'))
      setNomeProposta(proposta.nome_proposta || '')
      setDataProposta(proposta.data_cadastro || new Date().toISOString().split('T')[0])
      setDescProposta(proposta.desc_proposta || '')
      setTipoProjeto(proposta.tipo_projeto || '')
      setInfluenciadorDecisor(proposta.influenciador_decisor || '')
      setPerfilOrcamento(proposta.perfil_orcamento || '')
      setProbFechamento(proposta.prob_fechamento || '')
      setStatusProposta(proposta.status_proposta || '')
      setMaterialInsumo(proposta.material_insumo || '')
      setServicos(proposta.servicos || '')
      setValorProposta(proposta.valor_proposta || 0)
    } else {
      clearFields()
    }
  }, [proposta])

  const clearFields = () => {
    setNomeProposta('')
    setDataProposta(new Date().toISOString().split('T')[0])
    setDescProposta('')
    setConsultor('')
    setConsultorProp(sessionStorage.getItem('user_id'))
    setTipoProjeto('')
    setInfluenciadorDecisor('')
    setPerfilOrcamento('')
    setProbFechamento('')
    setStatusProposta('')
    setMaterialInsumo('')
    setServicos('')
    setValorProposta(0)
  }

  const handleSave = async () => {   
    const validateFields = () => {
      if (
        !validateField(nomeProposta.trim(), "Nome da Proposta", 1, 255) ||
        !validateField(descProposta.trim(), "Descrição da Proposta", 1) ||
        !validateField(influenciadorDecisor.trim(), "Influenciador/Decisor", 1, 255) ||
        !validateField(tipoProjeto.trim(), "Tipo Projeto", 1) ||
        !validateField(perfilOrcamento.trim(), "Perfil Orçamento", 1) ||
        !validateField(probFechamento, "Probabilidade Fechamento", 1) ||
        !validateField(statusProposta.trim(), "Status Proposta", 1) ||
        !validateField(materialInsumo.trim(), "Material / Insumo", 1) ||
        !validateField(servicos.trim(), "Serviços", 1) ||
        !validateField(valorProposta.toString().trim(), "Valor Proposta", undefined, undefined, true) 
      ) {
        return false
      }
      return true
    }
  
    if (!validateFields()) {
      return
    }
  
    const data = {
      nome_proposta: nomeProposta.trim(),
      desc_proposta: descProposta.trim(),
      consultor_prop: Number(consultorProp),
      tipo_projeto: tipoProjeto.trim(),
      influenciador_decisor: influenciadorDecisor.trim(),
      perfil_orcamento: perfilOrcamento.trim(),
      prob_fechamento: probFechamento,
      status_proposta: statusProposta.trim(),
      material_insumo: materialInsumo.trim(),
      servicos: servicos.trim(),
      valor_proposta: Number(valorProposta),
      prospeccao: Number(prospectId),
      somatorio: 0,
      tipo_contato: 'Proposta',
      ativa: true
    }
    if (proposta) {
      if (propostas[0].subPropostas?.length > 0) {
        data.id = propostas[0].subPropostas[propostas[0].subPropostas.length - 1].id
      } else {
        data.id = proposta.id
      }
    }
    try {
      const savedProposta = await (await createProposta(data)).data.data.proposta
      toast.success('Proposta salva com sucesso.')
      if (proposta) {
        setPropostas(propostas.map(p => 
          (p.proposta.id === proposta.id
            ? { ...p, subPropostas: [...p.subPropostas, savedProposta] }
            : p)
        ))
      } else {
        setPropostas([...propostas, { proposta: savedProposta, subPropostas: [] }])
      }
    } catch (error) {
      toast.error('Erro ao salvar proposta.')
    }
    clearFields()
    handleClose()
  }

  const handleCancel = () => {
    clearFields()
    handleClose()
  }

  const handlePropFechamentoChange = e => {
    const { value } = e.target
    if (value > 100) {
      setProbFechamento(100)
    } else if (value < 0) {
      setProbFechamento(0)
    } else {
      setProbFechamento(value)
    }
  }
  
  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={handleClose}
      open={open}
    >
      <StyledModalBox>
        <Typography color="#9181f4" component="h2" fontWeight="bold" sx={{ marginBottom: '20px' }} variant="h5">
          {proposta ? 'Nova Versão de Proposta' : 'Cadastro de Proposta'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'row' }}>
          <StyledColumn gap="10px">
            <StyledRegisterTextField label="Nome da Proposta" onChange={e => setNomeProposta(e.target.value)} value={nomeProposta} />
            <StyledRegisterTextField defaultValue={dataProposta} label="Data proposta" onChange={e => setDataProposta(e.target.value)} type="date" />
            <StyledRegisterTextField label="Descrição da Proposta" multiline onChange={e => setDescProposta(e.target.value)} rows={4} value={descProposta} />
            <StyledRegisterTextField disabled label="Consultor" value={consultor} />
            <StyledRegisterTextField label="Status Proposta" onChange={e => setStatusProposta(e.target.value)} select value={statusProposta}>
              <MenuItem value="Em elaboração">Em elaboração</MenuItem>
              <MenuItem value="Em negociação">Em negociação</MenuItem>
              <MenuItem value="Em revisão">Em revisão</MenuItem>
              <MenuItem value="Descontinuado">Descontinuado</MenuItem>
              <MenuItem value="Suspenso">Suspenso</MenuItem>
              <MenuItem value="Perdido">Perdido</MenuItem>
              <MenuItem value="Vendido">Vendido</MenuItem>
            </StyledRegisterTextField>
            <ValorPropostaField
              onChange={handleValorPropostaChange}
              value={valorProposta}
            />
          </StyledColumn>
          <StyledColumn gap="10px">
            <StyledRegisterTextField label="Tipo Projeto" onChange={e => setTipoProjeto(e.target.value)} value={tipoProjeto} />
            <StyledRegisterTextField label="Influenciador/Decisor" onChange={e => setInfluenciadorDecisor(e.target.value)} value={influenciadorDecisor} />
            <StyledRegisterTextField label="Perfil Orçamento" onChange={e => setPerfilOrcamento(e.target.value)} value={perfilOrcamento} />
            <StyledRegisterTextField InputProps={{ inputProps: { min: 0, max: 100 } }} label="Probabilidade Fechamento" onChange={handlePropFechamentoChange} type="number" value={probFechamento} />
            <StyledRegisterTextField label="Material / Insumo" onChange={e => setMaterialInsumo(e.target.value)} value={materialInsumo} />
            <StyledRegisterTextField label="Serviços" onChange={e => setServicos(e.target.value)} value={servicos} />
          </StyledColumn>
        </Box>
        <StyledActionArea>
          <Button onClick={handleCancel} sx={{ marginRight: '10px' }} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="primary">
            Salvar
          </Button>
        </StyledActionArea>
      </StyledModalBox>
    </Modal>
  )
}

const formatarValorParaMoeda = valor => {
  const valorStr = String(valor)
  return valorStr ? parseFloat(valorStr.replace(/\D/g, '')) / 100 : 0
}


const ValorPropostaField = ({ value, onChange }) => {
  const handleValueChange = e => {
    const valorNumerico = formatarValorParaMoeda(e.target.value)
    onChange(valorNumerico)
  }
  const valorFormatado = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (
    <TextField
      label="Valor Proposta"
      onChange={handleValueChange}
      type="text" 
      value={valorFormatado}
    />
  )
}

ValorPropostaField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

const validateField = (value, fieldName, minLength, maxLength, isNumber = false) => {
  const trimmedValue = value.trim()
  if (isNumber) {
    const numberValue = parseFloat(trimmedValue)
    if (isNaN(numberValue)) {
      toast.error(`O campo ${ fieldName } deve ser um número.`)
      return false
    }
  } else {
    if (minLength && (!trimmedValue || trimmedValue.length < minLength)) {
      toast.error(`O campo ${ fieldName } não deve ser vazio.`)
      return false
    }
    if (maxLength && trimmedValue && trimmedValue.length > maxLength) {
      toast.error(`O campo ${ fieldName } não deve exceder ${ maxLength } caracteres.`)
      return false
    }
  }
  return true
}

PropostaModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  proposta: PropTypes.object,
  propostas: PropTypes.array,
  setPropostas: PropTypes.func.isRequired
}