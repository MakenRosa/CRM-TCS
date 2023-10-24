import { Box, Divider, styled } from "@mui/material"
import { Button } from "components"
import { Proposta } from "./Proposta"
import data from "./data.json"

const StyledButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
`

const StyledButtonsGroup = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 30px;
`

const StyledButton = styled(Button)`
  min-width: 120px;
`

const PropostaContainer = styled(Box)`
  position: relative;
`

const StyledFlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: auto;
  position: relative;
`

export const Propostas = () => (
  <Box display={"flex"} flexDirection={"column"} margin={"20px"} minHeight={"500px"} paddingBottom={"20px"} width={1}>
    <StyledButtons>
      <StyledButtonsGroup>
        <StyledButton variant={"primary"}>Venda</StyledButton>
        <StyledButton>Perdido</StyledButton>
      </StyledButtonsGroup>
      <StyledButtonsGroup>
        <StyledButton>Nova versão</StyledButton>
        <StyledButton variant="primary">Nova Proposta</StyledButton>
      </StyledButtonsGroup>
    </StyledButtons>
    <Box height={"100%"} position="relative" sx={{ overflowY: "scroll" }} width={1}>
      <StyledFlexBox>
        <Divider flexItem height={"100%"} orientation="vertical" sx={{ paddingLeft: "20px" }} />
        <Box marginLeft="20px" paddingRight="20px" width={1}>
          {data.map((item, index) => (
            <PropostaContainer key={index} marginBottom="20px">
              <Proposta proposta={item.proposta} subPropostas={item.subPropostas} />
            </PropostaContainer>
      ))}
        </Box>
      </StyledFlexBox>
    </Box>
  </Box>
)