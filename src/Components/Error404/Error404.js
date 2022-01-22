import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image404 from '../../assets/img/404Error-somosMas.svg';
import {
  pageContainer,
  mainGridContainer,
  messageError,
  homeButtom,
} from '../../Styles/Error404/Error404InlineStyles';

const Error404 = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  const error404Theme = createTheme();

  error404Theme.typography.h3 = {
    fontSize: '1.1rem',
    '@media (min-width:600px)': {
      fontSize: '1.8rem',
    },
    [error404Theme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
    },
  };

  return (
    <ThemeProvider theme={error404Theme}>
      <Grid container sm={12} alignItems="center" sx={pageContainer}>
        <Grid
          container
          item
          sm={12}
          md={8}
          justifyContent="center"
          alignItems="center"
          sx={mainGridContainer}>
          <Grid item xs={12} sm={7}>
            <img src={image404} alt="404" />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography
              variant="h3"
              component="p"
              textAlign="center"
              sx={messageError}>
              Oops.. Página no encontrada
            </Typography>
            <Button
              onClick={handleClick}
              variant="contained"
              size="medium"
              sx={homeButtom}>
              Ir al inicio
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Error404;
