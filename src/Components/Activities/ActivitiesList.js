import React, { useState, useEffect } from 'react';
import Spinner from '../CommonComponents/LoaderSpinner';
import { getActivities } from '../../Services/ActivitiesServices';
import ActivityContent from '../Activities/ActivityContent';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import ActivitiesSearchForm from './ActivitiesSearchForm';

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateActivitiesList = (updatedActivities) => {
    setActivities(updatedActivities);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getActivities();

      setActivities(response);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ my: '2rem' }}>
      <ActivitiesSearchForm updateActivitiesList={updateActivitiesList} />

      {isLoading ? (
        <Spinner />
      ) : activities.length > 0 ? (
        <Grid container columnSpacing={2} rowSpacing={4}>
          {activities.map((activity) => {
            return (
              <Grid key={activity.id} item md={4} sm={6} xs={12}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <CardActionArea
                    href={`/activities/${activity.id}`}
                    sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={activity.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {activity.name}
                      </Typography>
                      <ActivityContent
                        content={
                          activity.description?.length > 200
                            ? activity.description.slice(0, 200) + '...'
                            : activity.description
                        }
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography textAlign="center" variant="h4">
          No hay actividades
        </Typography>
      )}
    </Container>
  );
};

export default ActivitiesList;
