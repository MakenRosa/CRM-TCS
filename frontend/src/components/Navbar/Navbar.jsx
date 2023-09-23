import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, Button, Tooltip, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'
import { logoutUser } from 'utils'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { StyledNavContainer, StyledNavTitle } from '.'

const NavButton = ({ page, ...props }) => {  
  const Navigate = useNavigate()
  const urlPage = page === 'Início' ? 'dashboard' : page.toLowerCase()

  const location = useLocation()
  const active = location.pathname.includes(urlPage)

  return (
    <Button
      onClick={() => Navigate(`/${ urlPage }`)}
      sx={{ 
        my: 2, 
        display: 'block', 
        backgroundColor: active ? 'white' : 'transparent', 
        color: active ? '#9181f4' : 'inherit',
        '&:hover': {
          backgroundColor: 'white',
          color: '#9181f4'
        }
      }}
      variant="text"
      {...props}
    >
      {page}
    </Button>
  )
}

NavButton.propTypes = {
  page: PropTypes.string.isRequired
}

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const navigate = useNavigate()

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMenuClick = page => {
    const urlPage = page === 'Início' ? 'dashboard' : page.toLowerCase()
    navigate(`/${ urlPage }`)
    handleCloseNavMenu()
  }

  const menuItems = [
    { label: 'Início', handleOnClick: () => handleMenuClick('Início') },
    { label: 'Leads', handleOnClick: () => handleMenuClick('Leads') },
    { label: 'Oportunidades', handleOnClick: handleCloseNavMenu },
    { label: 'Tarefas', handleOnClick: handleCloseNavMenu },
    { label: 'Relatórios', handleOnClick: handleCloseNavMenu },
    { label: 'Configurações', handleOnClick: handleCloseNavMenu },
    { label: 'Administração', handleOnClick: handleCloseNavMenu }
  ]

  return (
    <AppBar position="static">
      <StyledNavContainer maxWidth="xl">
        <Toolbar disableGutters>
          <StyledNavTitle
            component="a"
            href="/dashboard"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' }

            }}
            variant="h1"
          >
            SOLVE
          </StyledNavTitle>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleOpenNavMenu}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              id="menu-appbar"
              keepMounted
              onClose={handleCloseNavMenu}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
            >
              {menuItems.map(item => (
                <MenuItem key={item.label} onClick={item.handleOnClick}>
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StyledNavTitle
            component="a"
            href="/"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1
            }}
            variant="h1"
          >
            SOLVE
          </StyledNavTitle>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map(
              item => <NavButton key={item.label} page={item.label} />
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Placeholder" src="https://placeholder.co/40" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              id="menu-appbar"
              keepMounted
              onClose={handleCloseUserMenu}
              open={Boolean(anchorElUser)}
              sx={{ mt: '45px' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem onClick={() => logoutUser()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </StyledNavContainer>
    </AppBar>
  )
}