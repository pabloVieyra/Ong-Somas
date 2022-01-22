import React, { useEffect, useState } from 'react';
import Title from '../../Title/Title';
import ActivityContent from '../ActivityContent';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { getActivityById } from '../../../Services/activitiesService';

export default function ActivityDetail({ match }) {
  const [activityDetails, setActivityDetails] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const activityId = match.params.id;

  useEffect(() => {
    getActivityById(activityId)
      .then((res) => {
        if (res.success === true) {
          setSuccess(true);
          setActivityDetails(res.data);
        } else if (res.response.data.success === false) {
          setSuccess(false);
        }
      })
      .finally(() => setIsLoading(false));
  }, [activityId]);

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      {success ? (
        <div>
          <Title
            bckgOpacity="0.5"
            imageUrl={activityDetails.image}
            titlePadding="10rem"
            titleText={activityDetails.name}
          />
          <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
            <Typography
              color="initial"
              sx={{ marginBlock: '1rem' }}
              variant="h4">
              Detalle de actividad
            </Typography>
            <Box fontSize={24} mb="3rem">
              <ActivityContent content={activityDetails.description} />
            </Box>
          </Container>
        </div>
      ) : (
        <Title
          titlePadding="12rem"
          titleText="Actividad no encontrada"
          variant="h3"
        />
      )}
    </>
  );
}
