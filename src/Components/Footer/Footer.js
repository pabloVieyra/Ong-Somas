import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Container, Box, TableFooter } from '@mui/material';
import { getOrganization } from '../../Services/organizationService';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  const linkStyle = { textDecoration: 'none', color: 'white' };
  const [organizationInformation, setOrganizationInformation] = useState({});
  const suscribed = localStorage.getItem('suscribed');

  useEffect(() => {
    getOrganization().then((res) => {
      setOrganizationInformation(res.data);
    });
  }, []);

  return (
    <TableFooter
      sx={{
        display: { xs: 'flex' },
        justifyContent: { xs: 'center' },
        alignItems: { xs: 'center' },
        flexDirection: { xs: 'column' },
        backgroundColor: '#28527A',
        color: 'white',
        marginTop: 'auto',
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
            justifyContent: { xs: 'center' },
            alignItems: { xs: 'center' },
            flexDirection: { xs: 'column' },
            width: { xs: '100%' },
          }}>
          <img alt="logo" height="120px" src={organizationInformation.logo} />
        </Box>
        <Box
          sx={{
            display: { xs: 'flex' },
            width: { xs: '100%' },
            justifyContent: { xs: 'space-evenly' },
            alignItems: { xs: 'center' },
            flexWrap: { xs: 'wrap' },
          }}>
          <Box
            sx={{
              margin: '3px',
            }}>
            <Link style={linkStyle} to="/school-campaign">
              Campaña Escolar
            </Link>
          </Box>
          <Box
            sx={{
              margin: '3px',
            }}>
            <Link style={linkStyle} to="/toys-campaign">
              Campaña Juguetes
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex' },
            width: { xs: '100%' },
            justifyContent: { xs: 'space-evenly' },
          }}>
          <a
            href={`https://${organizationInformation.facebook_url}`}
            rel="noreferrer"
            target="_blank">
            <FacebookIcon
              sx={{
                fontSize: 40,
                textDecoration: 'none',
                color: '#ec4c4c',
              }}
            />
          </a>
          <a
            href={`https://${organizationInformation.linkedin_url}`}
            rel="noreferrer"
            target="_blank">
            <LinkedInIcon
              sx={{
                fontSize: 40,
                textDecoration: 'none',
                color: '#f8fc74',
              }}
            />
          </a>
          <a
            href={`https://${organizationInformation.instagram_url}`}
            rel="noreferrer"
            target="_blank">
            <InstagramIcon
              sx={{
                fontSize: 40,
                textDecoration: 'none',
                color: '#8dcaff',
              }}
            />
          </a>
          <a
            href={`https://${organizationInformation.twitter_url}`}
            rel="noreferrer"
            target="_blank">
            <TwitterIcon
              sx={{ fontSize: 40, textDecoration: 'none', color: 'white' }}
            />
          </a>
        </Box>
      </Container>
      <div style={{ margin: 'auto', display: 'block' }}>
        <NewsletterForm />
      </div>
    </TableFooter>
  );
};

export default Footer;
