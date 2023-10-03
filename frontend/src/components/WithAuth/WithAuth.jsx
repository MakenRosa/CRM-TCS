import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from 'utils'

// eslint-disable-next-line react/display-name
export const WithAuth = WrappedComponent => function (props) {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const loginPath = '/login'

    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem('access')
        if (token) {
          const isValid = await verifyToken(token)
          if (!isValid) {
            navigate(loginPath)
          }
        } else {
          navigate(loginPath)
        }
      } catch (error) {
        navigate(loginPath)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      checkAuth()
    }, [navigate])

    if (isLoading) {
      return <CircularProgress />
    }

    return <WrappedComponent {...props} />
  }
