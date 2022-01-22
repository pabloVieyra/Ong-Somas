import React from 'react';
import s from '../../Styles/Donations.module.css';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material/';
const Donations = ({ donationsTitle, donationsSubtitle }) => {
  return (
    <div className={s.container}>
      <div className={s.donationsText}>
        <Typography
          align="center"
          color="white"
          sx={{
            ['@media (max-width:580px)']: { fontSize: '4rem' },
            ['@media (max-width:380px)']: { fontSize: '3rem' },
          }}
          variant="h1">
          {donationsTitle}
        </Typography>
        <Typography
          align="center"
          color="white"
          sx={{
            ['@media (max-width:580px)']: { fontSize: '2rem' },
            ['@media (max-width:380px)']: { fontSize: '1rem' },
          }}
          variant="h3">
          {donationsSubtitle}
        </Typography>
      </div>
      <Card
        sx={{
          width: '14rem',
          margin: '3rem',
          borderRadius: '100px',
          ['@media (max-width:380px)']: { width: '10rem' },
        }}>
        <CardActionArea href="https://mpago.la/1Wub6i7">
          <CardContent>
            <img
              alt="mercadopago logo"
              className={s.logo}
              src="/images/mercadopago_logo.png"
            />
          </CardContent>
        </CardActionArea>
      </Card>

      <img alt="" className={s.image} src="/images/foto11.jpg" />
    </div>
  );
};

export default Donations;
