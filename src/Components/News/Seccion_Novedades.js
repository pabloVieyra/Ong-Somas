import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import Video from './Ultimo Evento/Video';
import { NewsSearch_Form } from './NewsSearch_Form';
import ActivityContent from '../Activities/ActivityContent';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import { listHasValues } from '../../Utils';
import { getAllNews } from '../../Services/NewsService.js';
import {
  Alert,
  Card,
  CardMedia,
  Container,
  Grid,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';

const Seccion_Novedades = () => {
  const [novedades, setNovedades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllNews().then((res) => setNovedades(res));
  }, []);

  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };
  const updateNewsList = (updatedNews) => {
    setNovedades(updatedNews);
  };

  return (
    <>
      <Title bckgColor="#8DCAFF" titleText={'Novedades'} />
      <Container sx={{ my: '2rem' }}>
        <NewsSearch_Form
          updateLoadingState={updateLoadingState}
          updateNewsList={updateNewsList}
        />
        {!listHasValues(novedades) && !isLoading ? (
          <Alert
            severity="warning"
            sx={{
              margin: '0 auto',
              justifyContent: 'center',
              marginTop: '30px',
            }}>
            Novedad no encontrada!
          </Alert>
        ) : null}

        {isLoading ? (
          <LoadSpinner sx={{ justifyContent: 'center' }} />
        ) : (
          <Grid container columnSpacing={2} rowSpacing={4} sx={{ my: '1rem' }}>
            {novedades.map((novedad) => {
              return (
                <Grid key={novedad.id} item md={4} sm={6} xs={12}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <CardActionArea
                      href={`/news/${novedad.id}`}
                      sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={novedad.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5">
                          {novedad.name}
                        </Typography>
                        <ActivityContent
                          content={
                            novedad.content?.length > 200
                              ? novedad.content.slice(0, 200) + '...'
                              : novedad.content
                          }
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Video />
      </Container>
    </>
  );
};

export default Seccion_Novedades;
