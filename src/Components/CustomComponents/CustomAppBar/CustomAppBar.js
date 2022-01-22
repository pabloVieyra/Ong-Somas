import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const CustomAppBar = ({ user }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: '#9AC9FB' }} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Avatar alt={user.name} src={user.image} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;
