const { styled, Container, Typography } = require("@mui/material")
const { Navigate } = require("react-router-dom")

export const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`

export const NotFoundTitle = styled(Typography)`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
`

export const NotFoundText = styled(Typography)`
  font-size: 18px;
  margin-bottom: 16px;
`

export const NavigateLink = styled(Navigate)`
  text-decoration: underline;
  color: #0000ee;
  cursor: pointer;
`