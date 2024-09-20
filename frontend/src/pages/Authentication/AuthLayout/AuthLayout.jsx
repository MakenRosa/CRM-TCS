import { Outlet } from "react-router-dom"
import loginImage from "assets/login.jpg"
import { verifyToken } from "utils"
import { useEffect } from "react"
import { StyledContainer, StyledSectionImage } from "."

export const AuthLayout = () => {
  useEffect(() => {
    verifyToken()
  }, [])
  
  return (
    <StyledContainer disableGutters maxWidth={false}>
      <Outlet />
      <StyledSectionImage>
        <img alt="Introdução ao sistema Solve" src={loginImage} />
      </StyledSectionImage>
    </StyledContainer>
  )
}