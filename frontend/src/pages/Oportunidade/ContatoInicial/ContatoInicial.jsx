import { Typography } from "@mui/material"
import { ColDivider, Column, Header, Key, KeyValue, StyledSection } from "./ContatoInicial.styles"

export const ContatoInicial = () => (
  <>
    <Column>
      <StyledSection>
        <Header variant="h6">Informações Negócio</Header>
        <KeyValue>
          <Key variant="body2">Nome Negócio:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Lead:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Segmento:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Possibilidades Comerciais</Header>
        <KeyValue>
          <Key variant="body2">Serviços/Produtos:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Dados Participação Comercial</Header>
        <KeyValue>
          <Key variant="body2">Participação Comercial:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Participação Efetiva:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Consultor:</Key>
          <Typography variant="body2">Nome Negócio</Typography>
        </KeyValue>
      </StyledSection>
    </Column>
    
    <ColDivider orientation="vertical" />
    
    <Column>
      <StyledSection>
        <Header variant="h6">Datas Relevantes</Header>
        <KeyValue>
          <Key variant="body2">Data Inicio Prospecção:</Key>
          <Typography variant="body2">10/20/2023</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Data Contato Inicial:</Key>
          <Typography variant="body2">10/20/2023</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Data Próxima Ação:</Key>
          <Typography variant="body2">10/20/2023</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Canais de Comunicação</Header>
        <KeyValue>
          <Key variant="body2">Preferência de Contato:</Key>
          <Typography variant="body2">Telefone</Typography>
        </KeyValue>
        <KeyValue>
          <Key variant="body2">Horário para Contato:</Key>
          <Typography variant="body2">Entre 13h e 15h</Typography>
        </KeyValue>
      </StyledSection>
      
      <StyledSection>
        <Header variant="h6">Observações/Notas</Header>
        <KeyValue>
          <Key variant="body2">Observações adicionais:</Key>
          <Typography variant="body2">Entre 13h e 15h</Typography>
        </KeyValue>
      </StyledSection>
    </Column>
  </>
)
