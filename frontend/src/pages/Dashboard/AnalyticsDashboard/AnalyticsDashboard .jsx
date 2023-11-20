import React, { useState, useMemo } from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'
import PropTypes from 'prop-types'

const coresGrafico = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']

const mapeamentoDadosBarra = {
  prospeccao_lead: indicadores => ({
    'Leads': indicadores.analise_quantidade_lead,
    'Prospecções': indicadores.analise_quantidade_prospeccao
  }),
  proposta_prospeccao: indicadores => ({
    'Propostas': indicadores.analise_quantidade_propostas,
    'Prospecções': indicadores.analise_quantidade_prospeccao
  }),
  vendas_proposta: indicadores => ({
    'Vendas': indicadores.analise_quantidade_venda,
    'Propostas': indicadores.analise_quantidade_propostas
  }),
  vendas_prospeccao: indicadores => ({
    'Vendas': indicadores.analise_quantidade_venda,
    'Prospecções': indicadores.analise_quantidade_prospeccoes
  })
}

export const AnalyticsDashboard = ({ data }) => {

  if (!data || Object.keys(data).length === 0 || !data.prospeccao_lead) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p>Dados não disponíveis.</p>
      </Box>
    )
  }
  const [indiceSelecionado, setIndiceSelecionado] = useState('prospeccao_lead')

  const dadosGraficosBarra = useMemo(() => {
    const indicadores = data[indiceSelecionado]
    const dadosMapeados = mapeamentoDadosBarra[indiceSelecionado](indicadores)
    const datasets = Object.keys(dadosMapeados).map((key, index) => ({
      label: key,
      data: Object.values(dadosMapeados[key]),
      backgroundColor: coresGrafico[index],
      hoverBackgroundColor: `${ coresGrafico[index]  }99`
    }))

    return {
      labels: Object.keys(data.prospeccao_lead.analise_quantidade_lead),
      datasets
    }
  }, [indiceSelecionado])

  const dadosGraficoPizza = useMemo(() => {
    const { razao } = data[indiceSelecionado]
    return {
      labels: ['Conversão', 'Restante'],
      datasets: [
        {
          data: [razao, 1 - razao],
          backgroundColor: ['#36A2EB', '#FF6384']
        }
      ]
    }
  }, [indiceSelecionado, data])
  const opcoesGraficoPizza = {
    plugins: {
      tooltip: {
        callbacks: {
          label (context) {
            let label = context.label || ''
            if (label) {
              label += ': '
            }
            const total = context.dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
            const currentValue = context.parsed
            // eslint-disable-next-line no-magic-numbers
            const percentage = Math.round(((currentValue/total) * 100))
            label += `${ percentage  }%`
            return label
          }
        }
      }
    }
  }

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
        {dadosGraficosBarra.datasets.map((dataset, index) => (
          <Box key={index} sx={{ width: '40%', maxWidth: '600px', height: '300px' }}>
            <Bar 
              data={{ labels: dadosGraficosBarra.labels, datasets: [dataset] }} 
              options={{ indexAxis: 'y', maintainAspectRatio: false, scales: { y: { ticks: { autoSkip: false } } } }}
            />
          </Box>
        ))}
        <Box sx={{ width: '300px', height: '300px' }}>
          <Pie data={dadosGraficoPizza} options={opcoesGraficoPizza} />
        </Box>
      </Box>
    </Box>
  )
}

AnalyticsDashboard.propTypes = {
  data: PropTypes.object
}