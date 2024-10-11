import * as React from "react";
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
  const user_type = "Empresa" //Reemplazar por la info del contexto/token
  const user_photo = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  const navigate = useNavigate();
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

  const handleLogOut = () => { //TODO: Crear función en el contexto
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/");
  };

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
            <a href="/home">
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
                {user_type === "Institucional" && (
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
                {user_type === "Institucional" && (
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
              {user_type === "Institucional" && (
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
              {user_type === "Institucional" && (
                <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                  Ofertas inscritas
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseMenu(setAnchorElOfertas)}>
                Ofertas publicadas
              </MenuItem>
            </Menu>
          </Box>

          {/* Perfil de usuario */}
          <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "column" }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenMenu(setAnchorElUser)}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src={user_photo} sx={{height: "2rem", width:"2rem"}} />
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