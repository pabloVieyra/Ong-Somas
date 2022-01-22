import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './SidebarBackoffice';
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const HeaderBackoffice = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', padding: '0' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#9AC9FB',
          zIndex: { xl: '1201' },
        }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              size="large"
              sx={{ mr: 2, display: { xl: 'none' } }}
              onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to="/backoffice">
              <Typography variant="h5">Backoffice</Typography>
            </Link>
          </div>
          <div>
            <Button
              href="/"
              sx={{
                textTransform: 'none',
                fontSize: '.8rem',
                margin: '10px',
              }}
              variant="contained">
              WEB PÚBLICA
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        isOpen={drawerOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          padding: '0',
        }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default HeaderBackoffice;
