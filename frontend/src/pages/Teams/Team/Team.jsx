import { ExpandLess, ExpandMore, GroupsOutlined, RadioButtonUnchecked } from "@mui/icons-material"
import { Box, Checkbox, Typography } from "@mui/material"
import { Button, Invite } from "components"
import { useState } from "react"
import PropTypes from 'prop-types'
import { deleteUser } from "utils"
import { StyledCheckedIcon, StyledTeam } from "./Team.styles"

export const Team = ({ team, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isUserStaff, setIsUserStaff] = useState(false)
  
  const [selectedIds, setSelectedIds] = useState([])

  const openInviteModal = () => {
    setIsInviteOpen(true)
  }

  const toggleId = (id, isChecked) => {
    if (isChecked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
    }
  }
  
  const handleDelete = () => {
    selectedIds.forEach(id => {
      deleteUser(id)
        .then(() => {
          setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
        })
    }
  )}

  return (
    <>
      <Invite onClose={() => setIsInviteOpen(false)} open={isInviteOpen} />
      <StyledTeam isCollapsed={isCollapsed}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <GroupsOutlined sx={{ fontSize: 40, marginRight: '1rem', display: 'flex', alignItems: 'center' }} />
            <Typography
              fontSize={30} 
              fontWeight="bold" 
              sx={{ color: '#9181f4' }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Checkbox
              checkedIcon={<StyledCheckedIcon />} 
              icon={<RadioButtonUnchecked />}
              size="medium"
              sx={{ display: isCollapsed ? 'none' : 'block' }}
            />
          </Box>
        </Box>
        {
        !isCollapsed && (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '1180px', marginTop: '1rem', marginLeft: '60px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px', gap: '1rem' }}>
            {team.map((integrante, index) => (
              <Box 
                key={index} 
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10rem' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                  <Checkbox 
                    checkedIcon={<StyledCheckedIcon />}
                    icon={<RadioButtonUnchecked />}
                    onChange={e => toggleId(integrante.id, e.target.checked)}
                    size="small"
                  />
                  <Typography
                    fontSize={20}
                    variant="h6"
                  >
                    {integrante.first_name}
                  </Typography>
                </Box>
                <Typography 
                  fontSize={20} 
                  variant="h6"
                >
                  {integrante.email}
                </Typography>
              </Box>
          ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px', gap: '1rem' }}>
            <Button onClick={openInviteModal} variant="primary">Convidar</Button>
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
    </>
  )
}

Team.propTypes = {
  team: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string
}