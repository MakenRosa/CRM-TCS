import { Button, Form, TextField } from "components"
import { Email } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { StyledLinks, SectionLogin } from "pages"

export const ForgotPassword = () => 
  <SectionLogin h="50%" title="Recuperar Senha">
    <p>
      Informe seu e-mail para receber instruções sobre como redefinir sua
      senha.
    </p>
    <Form>
      <TextField
        fullWidth
        icon={<Email />}
        placeholder="Email"
        position="start"
        size="small"
        type="email"
        variant="filled"
      />
      <StyledLinks maxHeight="40px">
        <Button
          className="btn--secondary"
          component={Link}
          to="/login"
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button className="btn--primary" type="submit" variant="contained">
          Enviar
        </Button>
      </StyledLinks>
    </Form>
  </SectionLogin>


