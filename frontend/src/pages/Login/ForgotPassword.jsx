import { AuthLayout } from "./AuthLayout"
import Button from "components/Button"
import { Email } from "@mui/icons-material"
import Form from "components/Form"
import { SectionLogin } from "./SectionLogin"
import { TextField } from "components/TextField"

export const ForgotPassword = () => 
  <AuthLayout>
    <SectionLogin title="Recuperar Senha">
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

        <Button className="btn--primary" type="submit" variant="contained">
          Enviar
        </Button>
      </Form>
    </SectionLogin>
  </AuthLayout>

