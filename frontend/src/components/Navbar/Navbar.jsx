import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider
} from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useState } from "react"
import { logoutUser } from "utils"
import PropTypes from "prop-types"
import { useNavigate, useLocation } from "react-router-dom"
import { DeleteAccount } from "components"
import { StyledNavContainer, StyledNavTitle } from "."

const NavButton = ({ label, route, ...props }) => {
  const Navigate = useNavigate()
  const active = useLocation().pathname.includes(route)

  return (
    <Button
      onClick={() => Navigate(`/${ route }`)}
      sx={{
        my: 2,
        display: "block",
        backgroundColor: active ? "white" : "transparent",
        color: active ? "#9181f4" : "inherit",
        "&:hover": {
          backgroundColor: "white",
          color: "#9181f4"
        }
      }}
      variant="text"
      {...props}
    >
      {label}
    </Button>
  )
}

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
}

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)


  const username = sessionStorage.getItem("username")

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

  const handleMenuClick = route => {
    navigate(`/${ route }`)
    handleCloseNavMenu()
  }

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }
  

  const menuItems = [
    { label: "Início", route: "dashboard" },
    { label: "Leads", route: "leads" },
    { label: "Oportunidades", route: "oportunidades" },
    { label: "Relatórios", route: "relatorios" },
    { label: "Configurações", route: "configuracoes" },
    { label: "Grupo", route: "equipe" }
  ]

  return (
    <>
      <DeleteAccount onClose={handleCloseDeleteModal} open={openDeleteModal} />
      <AppBar position="static">
        <StyledNavContainer maxWidth="xl">
          <Toolbar disableGutters>
            <StyledNavTitle
              component="a"
              href="/dashboard"
              noWrap
              sx={{
              mr: 2,
              display: { xs: "none", md: "flex" }
            }}
              variant="h1"
            >
              SOLVE
            </StyledNavTitle>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left"
              }}
                id="menu-appbar"
                keepMounted
                onClose={handleCloseNavMenu}
                open={Boolean(anchorElNav)}
                sx={{
                display: { xs: "block", md: "none" }
              }}
                transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              >
                {menuItems.map(item => (
                  <MenuItem key={item.label} onClick={() => handleMenuClick(item.route)}>
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
              display: { xs: "flex", md: "none" },
              flexGrow: 1
            }}
              variant="h1"
            >
              SOLVE
            </StyledNavTitle>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menuItems.map(item => (
                <NavButton key={item.label} label={item.label} route={item.route} />
            ))}
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
                vertical: "top",
                horizontal: "right"
              }}
                id="menu-appbar"
                keepMounted
                onClose={handleCloseUserMenu}
                open={Boolean(anchorElUser)}
                sx={{ mt: "45px" }}
                transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              >
                <MenuItem disabled>
                  <Typography textAlign="center">{username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => logoutUser()}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleOpenDeleteModal}>
                  <Typography color="error" textAlign="center">Excluir conta</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </StyledNavContainer>
      </AppBar>
    </>
  )
}
