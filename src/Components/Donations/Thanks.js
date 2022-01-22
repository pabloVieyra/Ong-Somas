import React from 'react';
import s from '../../Styles/Thanks.module.css';
import { Paper, Typography } from '@mui/material/';

const Thanks = () => {
  return (
    <div className={s.container}>
      <Paper elevation={3} sx={{ padding: '1.6rem' }}>
        <Typography align="center" sx={{ marginBlock: '2rem' }} variant="h2">
          ¡Gracias!
        </Typography>

        <Typography align="center" variant="subtitle">
          Tu donación ha sido recibida con éxito. Gracias por colaborar con
          nosotros.
        </Typography>
        <Typography align="center" sx={{ marginBlock: '1.7rem' }} variant="h5">
          ¡Cada día Somos Más!
        </Typography>
        <div className={s.imageContainer}>
          <img src="./images/somos_mas_logo.png" />
        </div>
      </Paper>
    </div>
  );
};

export default Thanks;
