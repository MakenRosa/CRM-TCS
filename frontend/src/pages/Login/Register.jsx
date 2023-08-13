import { AccountCircle, Check, Email, Lock } from "@mui/icons-material"
import { AuthLayout } from "./AuthLayout"
import Button from "components/Button"
import Form from "components/Form"
import { Link } from "react-router-dom"
import { SectionLogin } from "./SectionLogin"
import { StyledLinks } from "./Login.styles"
import { TextField } from "components/TextField"

export const Register = () => 
  <AuthLayout>
    <SectionLogin title="Cadastro">
      <Form>
        <TextField
          fullWidth
          icon={<AccountCircle />}
          placeholder="Matrícula ou CPF"
          position="start"
          size="small"
          type="text"
          variant="filled"
        />
        <TextField
          fullWidth
          icon={<Email />}
          placeholder="Email"
          position="start"
          size="small"
          type="email"
          variant="filled"
        />
        <TextField
          fullWidth
          icon={<Lock />}
          placeholder="Senha"
          position="start"
          size="small"
          type="password"
          variant="filled"
        />
        <TextField
          fullWidth
          icon={<Check />}
          placeholder="Confirme a Senha"
          position="start"
          size="small"
          type="password"
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
            Cadastrar
          </Button>
        </StyledLinks>
      </Form>
    </SectionLogin>
  </AuthLayout>

