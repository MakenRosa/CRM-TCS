import { Box, Tabs, Typography, styled } from "@mui/material"

export const StyledOportunidade = styled(Box) `
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 90%;
  height: 100%;
  background-color: #F3EFEF;
  border: 1px solid #968B8B;
  box-sizing: border-box;
  margin: 0 auto;
  top: 60px;
  padding: 20px;
  border-radius: 4px;
  justify-content: space-around;
`

export const StyledLeadInfo = styled(Box) `
width: 25%;
align-items: center;
padding: 0px 30px 0px 30px;
border-radius: 4px;
`

export const StyledLeadTitle = styled(Typography) `
  text-align: center;
  color: black;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 10px 20px 10px;
  background-color: #EDEBFD;
  border-radius: 4px;
  border: 1px solid #8B8686;
`

export const StyledLeadDetails = styled(Box) `
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: #EDEBFD;
  border-radius: 4px;
  border: 1px solid #8B8686;
`

export const StyledLeadDetailsTitle = styled(Typography) `
  text-align: center;
  color: black;
  font-weight: bold;
  padding: 10px 0px 0px 0px;
`

export const StyledLeadDetailsInfo = styled(Box) `
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0px 10px 10px 10px;
`

export const StyledLeadDetailInfo = styled(Box) `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 5px 0px 5px 10px;
`

export const StyledLeadDetailInfoTitle = styled(Typography) `
  color: #6C6C6C;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

export const StyledLeadDetailInfoValue = styled(Typography) `
  color: #9181F4;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

export const StyledProposta = styled(Box) `
  width: 75%;
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
`
export const MainContainer = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0px 20px;
  padding: 10px 40px;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  gap: 10px;
  `

export const StyledTabs = styled(Tabs) `
  margin-bottom: -1px;
  margin-left: 70px;
  button {
    color: #5038ED;
    font-weight: bold;
  }

  .Mui-selected {
    color: #5038ED;
    font-weight: bold;
    border: 1px solid #E0E0E0;
    border-bottom: 1px solid #FFFFFF;
    background-color: #FFFFFF;

  }
  .MuiTabs-indicator {
    background-color: none;
  }
`