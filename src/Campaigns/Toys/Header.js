import React from 'react';
import { Box, Typography } from '@mui/material';
import ongLogo from '../../assets/logos/ong.png';
import campaingLogo from '../../assets/logos/toys-campaign.png';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'space-around' },
        alignItems: 'center',
        height: '5rem',
        mb: '2rem',
        py: '1rem',
        backgroundColor: { md: 'rgba(250, 250, 136, 0.5)' },
      }}>
      <Box
        alt="Logo Campaña Juguetes"
        component="img"
        src={campaingLogo}
        sx={{ height: '100%', width: 'auto' }}
      />
      <Typography sx={{ display: { xs: 'none', md: 'block' } }} variant="h3">
        Juguetes Por Más Sonrisas
      </Typography>
      <Box
        alt="Logo ONG"
        component="img"
        src={ongLogo}
        sx={{
          height: '100%',
          width: 'auto',
          display: { xs: 'none', sm: 'block' },
        }}
      />
    </Box>
  );
};

export default Header;
