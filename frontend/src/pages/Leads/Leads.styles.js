import { FilterAltOutlined } from "@mui/icons-material"
import { Box, IconButton, Paper, styled } from "@mui/material"

export const StyledButtonBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: ${ props => (props.gap ? props.gap : '20px') };

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`

export const StyledFilterSearchBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin: 0px;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`

export const StyledSearchFilter = styled(Box)`
  display: flex;
  justify-content: space-between;                                                 
  align-items: center;
  width: 70%;
  min-width: 400px;
  margin-left: 50px;
  margin-top: 20px;
  padding: 10px;
  gap: 20px;
  border: 1px solid #636161;
  border-bottom: none;
  background: #EEEBEB;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    min-width: 0;
    margin-left: 0;
    gap: 10px;
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

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const StyledIconButton = styled(IconButton)`
  padding: 10px;
  background: ${ ({ searched }) => (searched === "true" ? 'inherit' : 'var(--primary-gradient)') };
  color: ${ ({ searched }) => (searched === "true" ? 'inherit' : '#fff') };
  transition: all 0.3s ease-in-out;
`
