import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from 'utils' // Importe sua função verifyToken de api.js

// eslint-disable-next-line react/display-name
export const WithAuth = WrappedComponent => function (props) {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = sessionStorage.getItem('access')
          if (token) {
            const isValid = await verifyToken(token)
            if (!isValid) {
              navigate('/login')
            }
          } else {
            navigate('/login')
          }
        } catch (error) {
          navigate('/login')
        } finally {
          setIsLoading(false)
        }
      }
      
        checkAuth()
      }, [navigate])

    if (isLoading) {
      return <div>Loading...</div> // ou algum componente de carregamento
    }

    return <WrappedComponent {...props} />
  }
