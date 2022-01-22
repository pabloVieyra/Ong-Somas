import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getOrganization } from '../../Services/organizationService';
import Swal from 'sweetalert2';

const links = [
  {
    name: 'Inicio',
    path: '/',
  },
  {
    name: 'Nosotros',
    path: '/aboutus',
  },
  {
    name: 'Contacto',
    path: '/contact',
  },
  {
    name: 'Actividades',
    path: '/activities',
  },
  {
    name: 'Campaña Escolar',
    path: '/school-campaign',
  },
  {
    name: 'Campaña de Juguetes',
    path: '/toys-campaign',
  },
];

const Header_Wed = ({ isLogged }) => {
  const history = useHistory();
  const [organizationInformation, setOrganizationInformation] = useState({});
  const [navLinks, setNavLinks] = useState(links);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const token = localStorage.getItem('token');
  // const pathname = history.location.pathname;

  const getNavLinks = () => {
    const tobeRendered = [...links];

    if (isLogged === '2') {
      tobeRendered.splice(2, 1);
      setNavLinks(tobeRendered);

      return;
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.getItem('subscribed') && localStorage.removeItem('subscribed');
    setNavLinks(links);
  };

  // useEffect(() => {
  //   getOrganization().then((res) => {
  //     setOrganizationInformation(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   getNavLinks();
  // }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#28527A',
          color: 'white',
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ gap: '2rem' }}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', lg: 'none' },
              }}>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                aria-label="account of current user"
                color="inherit"
                size="large"
                onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                keepMounted
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                id="menu-appbar"
                open={Boolean(anchorElNav)}
                sx={{
                  display: { xs: 'block', lg: 'none' },
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handleCloseNavMenu}>
                {links.map((link) => (
                  <MenuItem
                    key={link.name}
                    component={Link}
                    // sx={{
                    //   backgroundColor:
                    //     link.path === pathname ? 'rgba(0, 0, 0, 0.1)' : 'white',
                    // }}
                    to={link.path}
                    onClick={handleCloseNavMenu}>
                    {link.name}
                  </MenuItem>
                ))}
                {token === '1' && (
                  <MenuItem
                    component={Link}
                    to="/donations"
                    onClick={() => {
                      handleCloseNavMenu();
                    }}>
                    Donacion
                  </MenuItem>
                )}
                {token === '2' && (
                  <MenuItem component={Link} to="/backoffice">
                    Backoffice
                  </MenuItem>
                )}
                {!isLogged ? (
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleCloseNavMenu}>
                    Iniciar sesión
                  </MenuItem>
                ) : (
                  <MenuItem
                    component={Link}
                    to="/"
                    onClick={() => {
                      handleCloseNavMenu();
                      handleLogout();
                      Swal.fire({
                        icon: 'success',
                        text: 'Sesión finalizada',
                      });
                    }}>
                    Cerrar sesión
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <img
              alt="logo"
              src={organizationInformation.logo}
              style={{ maxWidth: '100%', height: '150px' }}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  lg: 'flex',
                  justifyContent: 'right',
                },
                alignItems: 'center',
                gap: '0',
              }}>
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  component={Link}
                  size="small"
                  sx={{
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingInline: '.5rem',
                    whiteSpace: 'nowrap',
                    borderRadius: 'unset',
                    // borderBottom:
                    //   link.path === history.location.pathname
                    //     ? '2px solid white'
                    //     : '2px solid #28527A',
                    // ':hover': {
                    //   borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    // },
                  }}
                  to={link.path}
                  onClick={handleCloseNavMenu}>
                  {link.name}
                </Button>
              ))}
              {token === '1' && (
                <Button
                  component={Link}
                  sx={{
                    textTransform: 'none',
                    color: 'white',
                    height: '100%',
                    bgcolor: '#63CD65',
                    ':hover': {
                      bgcolor: '#63CD65',
                      color: 'primary.info',
                    },
                    marginLeft: '2rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                  to={'/donations'}
                  onClick={handleCloseNavMenu}>
                  Donaciones
                </Button>
              )}
              {token === '2' && (
                <Button
                  component={Link}
                  size="small"
                  sx={{
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'unset',
                    borderBottom: '2px solid #28527A',
                    ':hover': {
                      borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                    },
                  }}
                  to={'/backoffice'}
                  onClick={handleCloseNavMenu}>
                  Backoffice
                </Button>
              )}
              {!isLogged ? (
                <Button
                  color="primary"
                  component={Link}
                  sx={{
                    textTransform: 'none',
                    height: '100%',
                    bgcolor: 'white',
                    ':hover': {
                      bgcolor: '#EDF2F7',
                      color: 'primary.info',
                    },
                    marginLeft: '2rem',
                    textAlign: 'center',
                  }}
                  to="/login"
                  variant="outlined">
                  Iniciar sesión
                </Button>
              ) : (
                <Button
                  color="primary"
                  component={Link}
                  sx={{
                    textTransform: 'none',
                    height: '100%',
                    bgcolor: 'white',
                    ':hover': {
                      bgcolor: '#EDF2F7',
                      color: 'primary.info',
                    },
                    marginLeft: '1rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                  to="/"
                  variant="outlined"
                  onClick={() => {
                    handleLogout();
                    Swal.fire({
                      icon: 'success',
                      text: 'Sesión finalizada',
                    });
                  }}>
                  Cerrar sesión
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header_Wed;
