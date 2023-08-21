import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate()
    const isAuth = !!sessionStorage.getItem("token")
    
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [navigate])
    
    return(
      isAuth && 
      <div>
        <h1>Dashboard</h1>
      </div>
    )
}
