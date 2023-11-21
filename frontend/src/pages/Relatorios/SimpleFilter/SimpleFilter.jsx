import { Box, Typography } from "@mui/material"
import { toast } from "react-toastify"
import { StyledFilterBox } from "pages/Relatorios/Relatorios.styles" 
import { PictureAsPdfOutlined, TableChartOutlined } from "@mui/icons-material"

export const SimpleFilter = () => { 
  const user_id = sessionStorage.getItem("user_id")

  const handleDownloadClick = async format => {
    const url = `http://localhost:8000/api/relatorios/${ format }/?user_id=${ user_id }`
    
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

  const renderDownloadBox = (format, text, Icon) => (
    <StyledFilterBox onClick={() => handleDownloadClick(format)} sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, margin: '10px 20px' }}>
      <Icon fontSize="large" sx={{ color: '#fff', width: '50%', height: '50%' }} />
      <Typography color="#fff" variant="h6">{text}</Typography>
    </StyledFilterBox>
  )

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" marginTop="50px" width="100%">
      {renderDownloadBox('pdf', 'Baixar Relatório Geral (PDF)', PictureAsPdfOutlined)}
      {renderDownloadBox('excel', 'Baixar Relatório Geral (Excel)', TableChartOutlined)}
    </Box>
  )
}
