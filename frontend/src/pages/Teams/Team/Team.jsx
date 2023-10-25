import { useEffect, useState } from "react"
import { ExpandLess, ExpandMore, GroupsOutlined, RadioButtonUnchecked } from "@mui/icons-material"
import { Box, Checkbox, CircularProgress, Typography } from "@mui/material"
import { Button, Invite } from "components"
import PropTypes from 'prop-types'
import { deleteUserFromGroup, getUser } from "utils"
import { toast } from "react-toastify"
import { StyledCheckedIcon, StyledTeam } from "./Team.styles"

export const Team = ({ team, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isUserStaff, setIsUserStaff] = useState(false)
  const [loading, setLoading] = useState(false)

  const [selectedIds, setSelectedIds] = useState([])

  const current_user_id = sessionStorage.getItem('user_id')

  useEffect(() => {
    getUser(current_user_id)
      .then(res => {
        if (res.data.is_staff) {
          setIsUserStaff(true)
        } else {
          setIsUserStaff(false)
        }
      })
      .catch(() => {
        toast.error('Erro ao verificar permissão!')
      })
  }, [current_user_id])

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
    selectedIds.map(async id => {
      setLoading(true)
      if (id === parseInt(current_user_id)) {
        toast.error('Você não pode excluir a si mesmo!')
        setLoading(false)
        return
      }
      await deleteUserFromGroup(id)
        .then(() => {
          toast.success('Usuário excluído com sucesso!')
        })
        .catch(() => {
          if (id === parseInt(current_user_id)) {
            toast.error('Você não pode excluir a si mesmo!')
          }
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

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
              sx={{ display: isCollapsed ? 'none' : 'block', visibility: 'hidden' }}
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
                        disabled={!isUserStaff || parseInt(current_user_id) === integrante.id}
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
                <Button disabled={!isUserStaff} onClick={openInviteModal} variant="primary">Convidar</Button>
                <Button disabled={!isUserStaff} loading={loading} onClick={handleDelete} variant="secondary">{loading ? <CircularProgress color="inherit" size={24} /> : "Excluir"}</Button>
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