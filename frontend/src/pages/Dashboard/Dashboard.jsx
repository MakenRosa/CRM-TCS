import { Button, WithAuth } from 'components'
import { logoutUser } from 'utils'

const DashboardComponent = () => 
  <div>
    <h1>Dashboard</h1> 
    <Button onClick={logoutUser}>Logout</Button> 
  </div>  // Renderiza o conteúdo do painel se o usuário estiver autenticado
    
export const Dashboard = WithAuth(DashboardComponent) // Aplica o HOC WithAuth ao componente DashboardComponent