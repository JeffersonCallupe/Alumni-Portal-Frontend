import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoSM from "../../../assets/logoUNMSM.png";
import { useUser } from "../../../contexts/userContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElActividades, setAnchorElActividades] = React.useState(null);
  const [anchorElOfertas, setAnchorElOfertas] = React.useState(null);

  const handleOpenMenu = (setAnchor) => (event) => {
    setAnchor(event.currentTarget);
  };
  
  const handleCloseMenu = (setAnchor) => () => {
    setAnchor(null);
  };
  
  const navigate = useNavigate();
  const handleLogOut = () =>{
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }
  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#6F191C' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/home">
            <img src={LogoSM} alt="Logo" className="h-16 p-2 none md:flex" />
          </a>

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
                {user?.role === "Institucional" && (
                  <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                    Mis actividades inscritas
                  </MenuItem>
                )}
                <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                  Mis actividades publicadas
                </MenuItem>
              </Menu>

              <MenuItem onClick={handleOpenMenu(setAnchorElOfertas)}>
                <Typography textAlign="center">Ofertas Laborales</Typography>
              </MenuItem>
              <Menu
                anchorEl={anchorElOfertas}
                open={Boolean(anchorElOfertas)}
                onClose={handleCloseMenu(setAnchorElOfertas)}
              >
                {user?.role === "Institucional" && (
                  <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                    Ofertas inscritas
                  </MenuItem>
                )}
                <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                  Ofertas publicadas
                </MenuItem>
              </Menu>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleOpenMenu(setAnchorElActividades)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Actividades
            </Button>
            <Menu
              anchorEl={anchorElActividades}
              open={Boolean(anchorElActividades)}
              onClose={handleCloseMenu(setAnchorElActividades)}
            >
              {user?.role === "Institucional" && (
                <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                  Mis actividades inscritas
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseMenu(setAnchorElActividades)}>
                Mis actividades publicadas
              </MenuItem>
            </Menu>

            <Button
              onClick={handleOpenMenu(setAnchorElOfertas)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Ofertas Laborales
            </Button>
            <Menu
              anchorEl={anchorElOfertas}
              open={Boolean(anchorElOfertas)}
              onClose={handleCloseMenu(setAnchorElOfertas)}
            >
              {user?.role === "Institucional" && (
                <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                  Ofertas inscritas
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                Ofertas publicadas
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenMenu(setAnchorElUser)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.profilePicture} />
              </IconButton>
            </Tooltip>
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
              <MenuItem onClick={handleLogOut}>
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