import { FilterAltOutlined } from "@mui/icons-material"
import { Box, IconButton, Paper, Typography, styled } from "@mui/material"

export const StyledLeadsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 50px;

  @media (max-width: 512px) {
    margin: 30px 0px;
  }
`

export const StyledLeadsTitle = styled(Typography)`
  font-size: 36px;  
  font-weight: bold;

  @media (max-width: 512px) {
    justify-content: center;
    margin-left: 20px;
    margin-bottom: 20px;
  }
`

export const StyledButtonBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 20px;

  @media (max-width: 512px) {
    justify-content: center;
  }
`

export const StyledFilterSearchBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin: 0px;
`

export const StyledSearchFilter = styled(Box)`
  display: flex;
  justify-content: space-between;                                                 
  align-items: center;
  width:70%;
  min-width: 400px;
  margin-left: 50px;
  margin-top: 20px;
  padding: 10px;
  gap: 20px;
  border: 1px solid #636161;
  border-bottom: none;
  background: #EEEBEB;

  @media (max-width: 512px) {
    flex-direction: column;
    width: 100%;
    min-width: 200px;
    margin-left: 0px;
  }
`

export const StyledLeadsFilterBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export const StyledFilterAltOutlined = styled(FilterAltOutlined)`
  color: #000000; 
  font-size: 30px;
  margin-top: 10px;
`

export const StyledInputPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 400px;

  @media screen and (max-width: 512px) {
    width: 100%;
  }
`

export const StyledIconButton = styled(IconButton)`
  padding: 10px;
  background: ${ props => (props.searched ? 'inherit' : 'var(--primary-gradient)') };
  color: ${ props => (props.searched ? 'inherit' : '#fff') };
  transition: all 0.3s ease-in-out;
`