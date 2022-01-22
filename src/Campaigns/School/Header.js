import React from 'react';
import { Box, Typography } from '@mui/material';
import ongLogo from '../../assets/logos/ong.png';
import campaingLogo from '../../assets/logos/school-campaign.png';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: { md: 'rgba(219, 87, 82, 0.5)' },
      }}>
      <Box
        maxWidth={'lg'}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-around' },
          alignItems: 'center',
          height: '5rem',
          width: '100%',
          m: '0 auto 2rem',
          py: '1rem',
        }}>
        <Box
          alt="Logo Campaña Escuela"
          component="img"
          src={campaingLogo}
          sx={{ height: '100%', width: 'auto' }}
        />
        <Typography sx={{ display: { xs: 'none', md: 'block' } }} variant="h3">
          Juntos en la Vuelta al Cole
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
    </Box>
  );
};

export default Header;
