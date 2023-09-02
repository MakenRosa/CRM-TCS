import { Button, WithAuth } from 'components'
import { logoutUser } from 'utils'

const DashboardComponent = () => 
  <div>
    <h1>Dashboard</h1> 
    <Button onClick={logoutUser}>Logout</Button> 
  </div>  
    
export const Dashboard = WithAuth(DashboardComponent) 