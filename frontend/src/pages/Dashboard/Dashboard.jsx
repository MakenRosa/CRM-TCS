import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate() // Função para navegar entre rotas
    const isAuth = !!sessionStorage.getItem("token") // Verifica se o usuário está autenticado com base no token na sessionStorage
    
    useEffect(() => {
        if (!isAuth) {
            navigate('/login') // Se não estiver autenticado, redireciona para a página de login
        }
    }, [navigate, isAuth])

    if (!isAuth) {
        return null // Não renderiza nada se o usuário não estiver autenticado
    }
    
    return(
      <div>
        <h1>Dashboard</h1> 
      </div>  // Renderiza o conteúdo do painel se o usuário estiver autenticado
    )
}
