/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types'
import { Box, Checkbox, IconButton, MenuItem, Select, Tooltip } from "@mui/material"
import map from 'assets/map.svg'
import map2 from 'assets/map2.svg'
import clock from 'assets/clock.svg'
import certificate from 'assets/certificate.svg'
import goback from 'assets/goback.svg'
import { StyledFilterBox } from "pages/Relatorios/Relatorios.styles"
import { useState } from 'react'
import { toast } from 'react-toastify'
import { PictureAsPdfOutlined } from '@mui/icons-material'
// eslint-disable-next-line import/no-relative-parent-imports
import ExcelIconOutlined from "../excelIconOutlined.svg"
import { StyledDateField, StyledTextLabel } from './AdvancedFilter.styles'

export const AdvancedFilter = ({ setIsAdvancedFilter }) => {
  const [filters, setFilters] = useState({
    data_criacao: '',
    data_ultima_alteracao: '',
    data_proxima_acao: '',
    estagio_negocio: '',
    comissao: false
  })

  const user_id = sessionStorage.getItem("user_id")

  const isAnyFilterSet = () => {
    const isDataCriacaoSet = filters.data_criacao !== ''
    const isDataUltimaAlteracaoSet = filters.data_ultima_alteracao !== ''
    const isDataProximaAcaoSet = filters.data_proxima_acao !== ''
    const isEstagioNegocioSet = filters.estagio_negocio !== '' && filters.estagio_negocio !== 'Selecione'
    const isComissaoSet = filters.comissao
    return isDataCriacaoSet || isDataUltimaAlteracaoSet || isDataProximaAcaoSet || isEstagioNegocioSet || isComissaoSet
  }

  const handleInputChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.checked })
  }

  const handleDownloadClick = async format => {
    const url = `http://localhost:8000/api/relatorios/${ format }/?user_id=${ user_id }${ filters.data_criacao ? `&data_criacao=${ filters.data_criacao }` : '' }${ filters.data_ultima_alteracao ? `&data_ultima_alteracao=${ filters.data_ultima_alteracao }` : '' }${ filters.data_proxima_acao ? `&data_proxima_acao=${ filters.data_proxima_acao }` : '' }${ filters.estagio_negocio ? `&estagio_negocio=${ filters.estagio_negocio }` : '' }${ filters.comissao ? `&comissao=${ filters.comissao }` : '' }`
    
    try {
      const response = await fetch(url)
      if (response.ok) {
        window.open(url, '_blank')
        toast.success(`O download do relatório em ${ format.toUpperCase() } foi iniciado.`)
      } else {
        throw new Error('Resposta da rede não foi ok.')
      }
    } catch (error) {
      toast.error(`Erro ao baixar o relatório em ${ format.toUpperCase() }: ${ error }`)
    }
  }

  const renderDownloadButton = (format, Icon) => (
    <Tooltip title={`Baixar Relatório em ${ format.toUpperCase() }`}>
      <IconButton
        disabled={!isAnyFilterSet()} 
        onClick={() => handleDownloadClick(format)}
        sx={{ 
          backgroundColor: isAnyFilterSet() ? '#B07FEE' : 'lightgrey', 
          margin: '5px',
          '&:hover': { backgroundColor: isAnyFilterSet() ? '#115293' : 'lightgrey' },
          width: 48,
          height: 48,
          opacity: isAnyFilterSet() ? 1 : 0.5 
        }}
      >
        {Icon === ExcelIconOutlined ? 
          <img alt="Excel Icon" src={ExcelIconOutlined} style={{ width: 30, height: 30 }} /> : 
          <Icon style={{ fontSize: 30, color: 'white' }} />
        }
      </IconButton>
    </Tooltip>
  )
  
  
  return (
    <Box display="flex" flexDirection="column" gap="5px" height="80%" justifyContent="center" marginTop="50px" width="80%">
      <Box alignItems="center" display="flex" justifyContent="flex-start" marginTop="-40px">
        {renderDownloadButton('pdf', PictureAsPdfOutlined)}
        {renderDownloadButton('excel', ExcelIconOutlined)}
      </Box>
      <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
        <StyledFilterBox>
          <img alt="map" src={map} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Estágio Negociação</StyledTextLabel>
          <Select defaultValue="Selecione" name="estagio_negocio" onChange={handleInputChange} size="small" style={{ color: "#fff" }}>
            <MenuItem value="Selecione">Selecione</MenuItem>
            <MenuItem value="Lead">Lead</MenuItem>
            <MenuItem value="Prospeccao">Prospecção</MenuItem>
            <MenuItem value="Proposta">Proposta</MenuItem>
            <MenuItem value="Venda">Venda</MenuItem>
            <MenuItem value="Perdido">Perdido</MenuItem>
          </Select>
        </StyledFilterBox>
        <StyledFilterBox>
          <img alt="map2" src={map2} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Criação</StyledTextLabel>
          <StyledDateField id="date" name="data_criacao" onChange={handleInputChange} size="small" style={{ color: "#fff" }} type="date" />
        </StyledFilterBox>
        <StyledFilterBox>
          <img alt="clock" src={clock} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Última Alteração</StyledTextLabel>
          <StyledDateField id="date" name="data_ultima_alteracao" onChange={handleInputChange} size="small" style={{ color: "#fff" }} type="date" />
        </StyledFilterBox>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="row" gap="5px" justifyContent="space-between">
        <StyledFilterBox>
          <img alt="clock" src={clock} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Próxima Ação</StyledTextLabel>
          <StyledDateField id="date" name="data_proxima_acao" onChange={handleInputChange} size="small" style={{ color: "#fff" }} type="date" />
        </StyledFilterBox>
        <StyledFilterBox>
          <img alt="certificate" src={certificate} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Comissão</StyledTextLabel>
          <Checkbox name="comissao" onChange={handleCheckboxChange} style={{ color: "#fff" }} />
        </StyledFilterBox>
        <StyledFilterBox onClick={() => setIsAdvancedFilter(false)}>
          <img alt="goback" src={goback} style={{ height: "50%" }} />
          <StyledTextLabel color="#fff" variant="h6">Voltar ao Filtro Básico</StyledTextLabel>
        </StyledFilterBox>
      </Box>
    </Box>
)
  }
AdvancedFilter.propTypes = {
  setIsAdvancedFilter: PropTypes.func.isRequired
}