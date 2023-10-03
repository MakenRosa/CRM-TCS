import { ExpandLess, ExpandMore, GroupsOutlined, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material"
import { Box, Checkbox, Typography, styled } from "@mui/material"
import { Button } from "components"
import { useState } from "react"
import PropTypes from 'prop-types'

const StyledTeam = styled(Box)`
  position: relative;
  background-color: white;
  padding: 20px 20px ${ props => (props.isCollapsed ? "20px" : "0px") } 20px;
  border: 1px solid #736C6C;
`

export const Team = ({ team }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <StyledTeam isCollapsed={isCollapsed}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <GroupsOutlined sx={{ fontSize: 40, marginRight: '1rem', display: 'flex', alignItems: 'center' }} />
          <Typography fontSize={30} variant="h5">{team.titulo}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Checkbox checkedIcon={<RadioButtonChecked />} icon={<RadioButtonUnchecked />} sx={{ display: isCollapsed ? 'none' : 'block' }} />
        </Box>
      </Box>
      {!isCollapsed && (
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '1180px', marginTop: '1rem', marginLeft: '60px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px', gap: '1rem' }}>
          {team.integrantes.map((integrante, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10rem' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                <Checkbox checkedIcon={<RadioButtonChecked />} icon={<RadioButtonUnchecked />} />
                <Typography fontSize={20} variant="h6">{integrante.nome}</Typography>
              </Box>
              <Typography fontSize={20} variant="h6">{integrante.email}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px', gap: '1rem' }}>
          <Button variant="primary">Editar</Button>
          <Button variant="secondary">Excluir</Button>
        </Box>
      </Box>
              )}
      <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', position: `${ isCollapsed ? 'absolute' : 'relative' }`, right: `${ isCollapsed ? '20px' : '0px' }`, top: `${ isCollapsed ? '15px' : '0px' }` }} >
        {isCollapsed ? 
          <ExpandMore fontSize="large" onClick={() => setIsCollapsed(!isCollapsed)} sx={{ fontSize: 50, cursor: 'pointer' }} /> :
          <ExpandLess fontSize="large" onClick={() => setIsCollapsed(!isCollapsed)} sx={{ fontSize: 50, cursor: 'pointer' }} />
                }
      </Box>
    </StyledTeam>
  )
              }

Team.propTypes = {
  team: PropTypes.shape({
    titulo: PropTypes.string,
    integrantes: PropTypes.arrayOf(PropTypes.shape({
      nome: PropTypes.string,
      email: PropTypes.string
    }))
  })
}