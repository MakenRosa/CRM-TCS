import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate()
    const isAuth = !!sessionStorage.getItem("token")
    
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [navigate, isAuth])

    if (!isAuth) {
        return null
    }
    
    return(
      <div>
        <h1>Dashboard</h1>
      </div>
    )
}
