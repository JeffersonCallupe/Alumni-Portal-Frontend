import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoActividades from "../../../assets/icons/actividades-button.png";
import LogoOfertasLaborales from "../../../assets/icons/ofertas-button.png";
import LogoSM from "../../../assets/logoUNMSM.png";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../../contexts/userContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isInstitutional, logout, profilePicture } = useUserContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElActividades, setAnchorElActividades] = React.useState(null);
  const [anchorElOfertas, setAnchorElOfertas] = React.useState(null);
  const Navigate = useNavigate();

  const handleOpenMenu = (setAnchor) => (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = (setAnchor) => () => {
    setAnchor(null);
  };

  const handleLogOut = () => {
    logout();
    Navigate("/");
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#6F191C",
        height: "4rem",
        padding: { xs: "none", md: "0 20rem 0 15rem" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", height: "100%" }}
        >
          {/* Logo */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <a href="/actividades">
              <img src={LogoSM} alt="Logo" style={{ height: "3rem" }} />
            </a>
          </Box>

          {/* Íconos vista móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenu(setAnchorElNav)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseMenu(setAnchorElNav)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleOpenMenu(setAnchorElActividades)}>
                <Typography textAlign="center">Actividades</Typography>
              </MenuItem>
              <Menu
                anchorEl={anchorElActividades}
                open={Boolean(anchorElActividades)}
                onClose={handleCloseMenu(setAnchorElActividades)}
              >
                <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                <a href="/actividadesHistorico">Ver actividades</a>
                </MenuItem>
                <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                <a href="/actividades">Mis actividades publicadas</a>
                </MenuItem>
                {isInstitutional && (
                  <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                    <a href="/actividadesRegistradas">Actividades registradas</a>
                  </MenuItem>
                )}
              </Menu>

              <MenuItem onClick={handleOpenMenu(setAnchorElOfertas)}>
                <Typography textAlign="center">Ofertas Laborales</Typography>
              </MenuItem>
              <Menu
                anchorEl={anchorElOfertas}
                open={Boolean(anchorElOfertas)}
                onClose={handleCloseMenu(setAnchorElOfertas)}
              >
                <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                <a href="/ofertasHistorico">Ver ofertas</a>
                </MenuItem>
                {isInstitutional && (
                  <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                    <a href="/ofertasAplicadas">Ofertas aplicadas</a>
                  </MenuItem>
                )}
                {!isInstitutional && (<MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                <a href="/ofertasLaborales">Mis ofertas publicadas</a>
                </MenuItem>
                )}  
              </Menu>
            </Menu>
          </Box>

          {/* Íconos vista de escritorio */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: "1rem",
              padding: "0 2rem",
            }}
          >
            <Button
              onClick={handleOpenMenu(setAnchorElActividades)}
              sx={{ color: "white", display: "flex", flexDirection: "column", textTransform: "capitalize" }}
            >
              <img
                src={LogoActividades}
                alt="Logo"
                style={{ height: "2rem"}}
              />
              <Typography variant="caption">Actividades</Typography>
            </Button>
            <Menu
              anchorEl={anchorElActividades}
              open={Boolean(anchorElActividades)}
              onClose={handleCloseMenu(setAnchorElActividades)}
            >
              <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
              <a href="/actividadesHistorico">Ver actividades</a>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
              <a href="/actividades">Mis actividades publicadas</a>
              </MenuItem>
              {isInstitutional && (
                <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                  <a href="/actividadesRegistradas">Actividades registradas</a>
                </MenuItem>
              )}
            </Menu>

            <Button
              onClick={handleOpenMenu(setAnchorElOfertas)}
              sx={{ color: "white", display: "flex", flexDirection: "column", textTransform: "capitalize" }}
            >
              <img
                src={LogoOfertasLaborales}
                alt="Logo"
                style={{ height: "2rem"}}
              />
              <Typography variant="caption">Ofertas Laborales</Typography>
            </Button>

            <Menu
              anchorEl={anchorElOfertas}
              open={Boolean(anchorElOfertas)}
              onClose={handleCloseMenu(setAnchorElOfertas)}
            >
              <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
              <a href="/ofertasHistorico">Ver ofertas</a>
              </MenuItem>
              {isInstitutional && (
                <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                  <a href="/ofertasAplicadas">Ofertas aplicadas</a>
                </MenuItem>
              )}
              {!isInstitutional && (<MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
              <a href="/ofertasLaborales">Mis ofertas publicadas</a>
              </MenuItem>
              )}  
            </Menu>
          </Box>

          {/* Perfil de usuario */}
          <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "column" }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenMenu(setAnchorElUser)}
                sx={{ p: 0 }}
              >
              <Avatar aria-label="profile-pic">
                <img src={profilePicture}></img>
              </Avatar>
              </IconButton>
            </Tooltip>
            <Typography variant="caption">Yo</Typography>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseMenu(setAnchorElUser)}
            >
              {/* Ver Perfil */}
              <MenuItem
                onClick={() => {
                  handleCloseMenu(setAnchorElUser)();
                  Navigate(isInstitutional ? "/profileInstitucional" : "/profile");
                }}
              >
                <Typography textAlign="center">Ver Perfil</Typography>
              </MenuItem>

              {/* Configuración */}
              <MenuItem
                onClick={() => {
                  handleCloseMenu(setAnchorElUser)();
                  Navigate("/settings");
                }}
              >
                <Typography textAlign="center">Configuración</Typography>
              </MenuItem>

              {/* Cerrar Sesión */}
              <MenuItem
                onClick={() => {
                  handleCloseMenu(setAnchorElUser)();
                  handleLogOut();
                }}
              >
                <Typography textAlign="center">Cerrar Sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;