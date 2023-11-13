import React, { useState, useMemo } from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'
import { dadosIndicadores } from './data'

const coresGrafico = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']

const rotulosIndicadores = {
  prospeccao_lead: ['Prospecção', 'Leads'],
  proposta_prospeccao: ['Proposta', 'Prospecção'],
  vendas_proposta: ['Vendas', 'Propostas'],
  vendas_prospeccao: ['Vendas', 'Prospecção']
}

const mapeamentoDadosTorta = {
  prospeccao_lead: indicadores => [indicadores.total_prospeccoes, indicadores.total_leads],
  proposta_prospeccao: indicadores => [indicadores.total_propostas, indicadores.total_prospeccoes],
  vendas_proposta: indicadores => [indicadores.total_vendas, indicadores.total_propostas],
  vendas_prospeccao: indicadores => [indicadores.total_vendas, indicadores.total_prospeccoes]
}

export const AnalyticsDashboard = () => {
  const [indiceSelecionado, setIndiceSelecionado] = useState('prospeccao_lead')

  const dadosGraficoTorta = useMemo(() => {
    const indicadores = dadosIndicadores[indiceSelecionado]
    const rotulos = rotulosIndicadores[indiceSelecionado] || ['Rótulo 1', 'Rótulo 2']
    const dadosIndiceSelecionado = mapeamentoDadosTorta[indiceSelecionado](indicadores)
  
    const dados = {
      labels: rotulos,
      datasets: [{
        data: dadosIndiceSelecionado,
        backgroundColor: coresGrafico,
        hoverBackgroundColor: coresGrafico.map(cor => `${ cor }99`)
      }]
    }
    return dados
  }, [indiceSelecionado])
  

  const dadosGraficoBarra = useMemo(() => {
    const indicadores = dadosIndicadores[indiceSelecionado]?.analise_quantidade || {}
    return {
      labels: Object.keys(indicadores),
      datasets: [{
        label: 'Quantidade por mês',
        data: Object.values(indicadores),
        backgroundColor: coresGrafico,
        hoverBackgroundColor: coresGrafico.map(cor => `${ cor }99`)
      }]
    }
  }, [indiceSelecionado])

  const handleChange = event => {
    setIndiceSelecionado(event.target.value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
      <FormControl>
        <InputLabel id="indice-select-label">Tipo de índice</InputLabel>
        <Select
          id="indice-select"
          label="Tipo de índice"
          labelId="indice-select-label"
          onChange={handleChange}
          value={indiceSelecionado}
        >
          <MenuItem value="prospeccao_lead">PROSPECÇÃO / LEADS</MenuItem>
          <MenuItem value="proposta_prospeccao">PROPOSTA / PROSPECÇÃO</MenuItem>
          <MenuItem value="vendas_proposta">VENDA / PROPOSTAS</MenuItem>
          <MenuItem value="vendas_prospeccao">VENDA / PROSPECÇÃO</MenuItem>
        </Select>
      </FormControl>
        
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
        <Box sx={{ width: '40%', maxWidth: '600px', height: '300px' }}>
          <Bar data={dadosGraficoBarra} options={{ indexAxis: 'y', maintainAspectRatio: false, scales: { y: { ticks: { autoSkip: false } } } }} />
        </Box>
        <Box sx={{ width: '40%', maxWidth: '600px', height: '300px' }}>
          <Doughnut data={dadosGraficoTorta} />
        </Box>
      </Box>
    </Box>
  )
}