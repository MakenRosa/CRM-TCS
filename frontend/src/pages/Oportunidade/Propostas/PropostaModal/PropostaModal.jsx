/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react'
import { PropTypes } from "prop-types"
import { Modal, Box, MenuItem, Typography } from "@mui/material"
import { Button, StyledRegisterTextField } from "components"
import { createProposta, getUser } from 'utils'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { StyledActionArea, StyledColumn, StyledModalBox } from "./PropostaModal.styles"

export const PropostaModal = ({ open, handleClose, proposta, propostas, setPropostas }) => {
  const [nomeProposta, setNomeProposta] = useState(proposta?.nome_proposta || '')
  const [dataProposta, setDataProposta] = useState(proposta?.data_cadastro || new Date().toISOString().split('T')[0])
  const [descProposta, setDescProposta] = useState(proposta?.desc_proposta || '')
  const [ consultorProp, setConsultorProp ] = useState(proposta?.consultor_prop || sessionStorage.getItem('user_id') )
  const [consultor, setConsultor] = useState(fetchConsultor(proposta?.consultor_prop || sessionStorage.getItem('user_id')))
  const [tipoProjeto, setTipoProjeto] = useState(proposta?.tipo_projeto || '')
  const [influenciadorDecisor, setInfluenciadorDecisor] = useState(proposta?.influenciador_decisor || '')
  const [perfilOrcamento, setPerfilOrcamento] = useState(proposta?.perfil_orcamento || '')
  const [probFechamento, setProbFechamento] = useState(proposta?.prob_fechamento || '')
  const [statusProposta, setStatusProposta] = useState(proposta?.status_proposta || '')
  const [materialInsumo, setMaterialInsumo] = useState(proposta?.material_insumo || '')
  const [servicos, setServicos] = useState(proposta?.servicos || '')
  const [valorProposta, setValorProposta] = useState(proposta?.valor_proposta || '')
  const { prospectId } = useParams()

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
      setValorProposta(proposta.valor_proposta || '')
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
    setValorProposta('')
  }

  const handleSave = async () => {   
    const validateFields = () => {
      if (
        !validateField(nomeProposta, "Nome da Proposta", 1, 255) ||
        !validateField(descProposta, "Descrição da Proposta", 1) ||
        !validateField(influenciadorDecisor, "Influenciador/Decisor", 1, 255) ||
        !validateField(tipoProjeto, "Tipo Projeto", 1) ||
        !validateField(perfilOrcamento, "Perfil Orçamento", 1) ||
        !validateField(probFechamento, "Probabilidade Fechamento", 1) ||
        !validateField(statusProposta, "Status Proposta", 1) ||
        !validateField(materialInsumo, "Material / Insumo", 1) ||
        !validateField(servicos, "Serviços", 1) ||
        !validateField(valorProposta.toString(), "Valor Proposta", undefined, undefined, true) // Assumindo que o valor pode ser 0, então não temos um minLength
      ) {
        return false
      }
      return true
    }
    if (!validateFields()) {
      return
    }
    const data = {
      nome_proposta: nomeProposta,
      desc_proposta: descProposta,
      consultor_prop: consultorProp,
      tipo_projeto: tipoProjeto,
      influenciador_decisor: influenciadorDecisor,
      perfil_orcamento: perfilOrcamento,
      prob_fechamento: probFechamento,
      status_proposta: statusProposta,
      material_insumo: materialInsumo,
      servicos,
      valor_proposta: valorProposta,
      prospeccao: prospectId,
      somatorio: 0,
      tipo_contato: 'Proposta',
      ativa: true
    }
    if (proposta) {
      data.id = proposta.id
    }
    try {
      const savedProposta = await (await createProposta(data)).data.data.proposta
      console.log(savedProposta)
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
            </StyledRegisterTextField>
            <StyledRegisterTextField label="Valor Proposta" onChange={e => setValorProposta(e.target.value)} type="number" value={valorProposta} />
          </StyledColumn>
          <StyledColumn gap="10px">
            <StyledRegisterTextField label="Tipo Projeto" onChange={e => setTipoProjeto(e.target.value)} select value={tipoProjeto}>
              <MenuItem value="Projeto">Projeto</MenuItem>
            </StyledRegisterTextField>
            <StyledRegisterTextField label="Influenciador/Decisor" onChange={e => setInfluenciadorDecisor(e.target.value)} select value={influenciadorDecisor}>
              <MenuItem value="Influenciador">Influenciador</MenuItem>
            </StyledRegisterTextField>
            <StyledRegisterTextField label="Perfil Orçamento" onChange={e => setPerfilOrcamento(e.target.value)} select value={perfilOrcamento}>
              <MenuItem value="Perfil">Perfil</MenuItem>
            </StyledRegisterTextField>
            <StyledRegisterTextField InputProps={{ inputProps: { min: 0, max: 100 } }} label="Probabilidade Fechamento" onChange={e => setProbFechamento(e.target.value)} type="number" value={probFechamento} />
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


const validateField = (value, fieldName, minLength, maxLength, isNumber = false) => {
  if (isNumber) {
    const numberValue = parseFloat(value)
    if (isNaN(numberValue)) {
      toast.error(`O campo ${ fieldName } deve ser um número.`)
      return false
    }
  } else {
    if (minLength && (!value || value.length < minLength)) {
      toast.error(`O campo ${ fieldName } deve ter pelo menos ${ minLength } caracteres.`)
      return false
    }
    if (maxLength && value && value.length > maxLength) {
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
