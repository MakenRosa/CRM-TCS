import PropTypes from "prop-types"
import { Typography } from "@mui/material"
import { ColDivider, Column, Header, Key, KeyValue, StyledSection } from "./ContatoInicial.styles"

export const ContatoInicial = ({ empresa, ...prospect }) => (
  <>
    <Column>
      <StyledSection>
        <Header variant="h6">Informações Negócio</Header>
        <KeyValue>
          <Key variant="body2">Nome Negócio:</Key>
          <Typography variant="body2">{prospect.nome_negocio}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Lead:</Key>
          <Typography variant="body2">{empresa}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Segmento:</Key>
          <Typography variant="body2">{prospect.segmento}</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Possibilidades Comerciais</Header>
        <KeyValue>
          <Key variant="body2">Serviços/Produtos:</Key>
          <Typography variant="body2">{prospect.servicos_produtos}</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Dados Participação Comercial</Header>
        <KeyValue>
          <Key variant="body2">Participação Comercial:</Key>
          <Typography variant="body2">{prospect.participacao_comercial}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Participação Efetiva:</Key>
          <Typography variant="body2">{prospect.participacao_efetiva}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Consultor:</Key>
          <Typography variant="body2">{prospect.consultor}</Typography>
        </KeyValue>
      </StyledSection>
    </Column>
    
    <ColDivider orientation="vertical" />
    
    <Column>
      <StyledSection>
        <Header variant="h6">Datas Relevantes</Header>
        <KeyValue>
          <Key variant="body2">Data Inicio Prospecção:</Key>
          <Typography variant="body2">{prospect.data_inicio_prospeccao}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Data Contato Inicial:</Key>
          <Typography variant="body2">{prospect.data_contato_inicial}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Data Próxima Ação:</Key>
          <Typography variant="body2">{prospect.data_proxima_acao}</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Canais de Comunicação</Header>
        <KeyValue>
          <Key variant="body2">Preferência de Contato:</Key>
          <Typography variant="body2">{prospect.preferencia_contato}</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Horário para Contato:</Key>
          <Typography variant="body2">{prospect.horario_contato}</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Observações/Notas</Header>
        <KeyValue>
          <Key variant="body2">Observações adicionais:</Key>
          <Typography variant="body2">{prospect.observacao}</Typography>
        </KeyValue>
      </StyledSection>
    </Column>
  </>
)

ContatoInicial.propTypes = {
  empresa: PropTypes.string,
  nome_negocio: PropTypes.string
}