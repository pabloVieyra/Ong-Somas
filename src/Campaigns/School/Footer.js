import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Container, Box } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import Logo from '../../assets/img/Logo.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const linkStyle = { textDecoration: 'none', color: 'white' };
  const socialMediaIconStyle = { fontSize: 40 };
  const socialMediaList = [
    { name: 'Instagram', icon: <InstagramIcon sx={socialMediaIconStyle} /> },
    { name: 'Facebook', icon: <FacebookIcon sx={socialMediaIconStyle} /> },
    { name: 'Twitter', icon: <TwitterIcon sx={socialMediaIconStyle} /> },
    { name: 'LinkedIn', icon: <LinkedInIcon sx={socialMediaIconStyle} /> },
  ];

  const socialMediaBox = () =>
    socialMediaList.map((media, indx) => (
      <Box
        key={indx}
        sx={{
          display: { md: 'flex' },
          justifyContent: { xs: 'center' },
          alignItems: { xs: 'center' },
        }}>
        <Link style={linkStyle} to="">
          {media.icon}
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <p>{media.name}</p>
        </Box>
      </Box>
    ));

  return (
    <TableFooter
      sx={{
        display: { xs: 'flex' },
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
        flexDirection: { xs: 'column' },
        backgroundColor: '#28527a',
        color: 'white',
      }}>
      <Container
        sx={{
          display: { xs: 'grid', sm: 'flex' },
          justifyContent: { xs: 'center' },
          alignItems: { xs: 'center' },
        }}>
        <Box
          sx={{
            display: { xs: 'flex' },
          }}>
          <img alt="Logo de la ONG" src={Logo} width="110px" />
        </Box>

        <Box
          sx={{
            display: { xs: 'flex' },
            alignItems: { xs: 'center' },
            justifyContent: { xs: 'space-evenly' },
            width: { xs: '100%' },
          }}>
          {socialMediaBox()}
        </Box>
      </Container>
      <Box
        sx={{
          display: { xs: 'flex' },
          justifyContent: { xs: 'center' },
          alignItems: { xs: 'center' },
          width: { xs: '100%' },
        }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginBottom: '15px' }}>
          <Link style={linkStyle} to="/">
            Visita nuestra página
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'none', xl: 'flex' } }}>
          <Link style={linkStyle} to="/school-campaign">
            Campaña Escolar
          </Link>
        </Box>
      </Box>
    </TableFooter>
  );
};

export default Footer;
