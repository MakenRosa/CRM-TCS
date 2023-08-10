import { AccountCircle, Lock } from "@mui/icons-material"
import { AuthLayout } from "./AuthLayout"
import Button from "components/Button"
import Form from "components/Form"
import { Link } from "@mui/material"
import { SectionLogin } from "./SectionLogin"
import { StyledLinks } from "./Login.styles"
import { TextField } from "components/TextField"

export const Login = () => 
  <AuthLayout>
    <SectionLogin title="Login">
      <Form>
        <TextField
          fullWidth
          icon={<AccountCircle />}
          placeholder="CPF ou Matrícula"
          position="start"
          size="small"
          type="text"
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
        <StyledLinks>
          <Link
            color="#430331"
            fontSize={14}
            fontWeight={700}
            href="/register"
            underline="none"
          >
            Primeiro acesso?
          </Link>
          <Link
            color="#8a8086"
            fontSize={13}
            href="/forgot-password"
            marginTop="-10px"
          >
            Esqueceu a senha?
          </Link>
        </StyledLinks>
        <Button className="btn--primary" type="submit" variant="contained">
          Login
        </Button>
      </Form>
    </SectionLogin>
  </AuthLayout>

