import { Box, TextField, Typography, styled } from "@mui/material"
import { Form } from "components"

export const StyledRegisterForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 1800px;
  margin: 0 auto;
`

export const StyledRegisterBox = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #F3EFEF;
  border: 1px solid #746F6F;
  justify-content: space-between;
  margin-top: 40px;
  padding: 40px 88px;
  gap: 15%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
    gap: 40px;
  }
`

export const StyledRegisterSection = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 55px;
`

export const StyledRegisterTextField = styled(TextField)`
  width: 100%;
  background: #FFFFFF;
  max-width: 666px;
  min-width: 200px;

  label.Mui-focused {
    color: var(--secondary-color);
    font-weight: 700;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: #787474;
      border-radius: 5px;
    }
    &.Mui-focused fieldset {
      border-color: var(--secondary-color);
    }
  }
`

export const StyledRegisterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 50px;

  @media (max-width: 512px) {
    margin: 30px 0px;
  }
`

export const StyledRegisterTitle = styled(Typography)`
  font-size: 36px;  
  font-weight: bold;

  @media (max-width: 512px) {
    justify-content: center;
    margin-left: 20px;
    margin-bottom: 20px;
  }
`