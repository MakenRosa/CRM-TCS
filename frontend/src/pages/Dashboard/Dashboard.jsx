import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate('/login')
        }
    }, [navigate])
    
    return(
      <div>
        <h1>Dashboard</h1>
      </div>
    )
}
