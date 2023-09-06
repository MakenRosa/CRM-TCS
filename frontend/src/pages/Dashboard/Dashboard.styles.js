import { Box, Select, Typography, styled } from "@mui/material"

export const StyledDashboard = styled(Box)`
  margin: 16px;
  padding: 16px;
`

export const StyledFilterBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #8F8B8B;
  padding: 16px;
  background-color: #F3EFEF;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }

`

export const StyledFilter = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 16px;
  gap: 8px;

  @media (max-width: 1045px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 800px) {
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const StyledSelect = styled(Select)`
  width: 200px;
  border-radius: 16px;
  height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  background-color: #FFFFFF;
`

export const StyledLabel = styled(Typography)`
  font-weight: bold;
  color: var(--secondary-color);

  @media (max-width: 800px) {
    width: 150px;
  }
`

export const StyledCardBox = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 24px;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`
