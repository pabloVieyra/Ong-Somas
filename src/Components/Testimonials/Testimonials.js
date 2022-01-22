import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import ActivityContent from '../Activities/ActivityContent';
import { getAllTestimonials } from '../../Services/testimonialsService';
import { format, parseISO } from 'date-fns';
import {
  Avatar,
  Card,
  CardHeader,
  Container,
  Grid,
  CardContent,
} from '@mui/material';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllTestimonials();

      setTestimonials(response.data.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title bckgColor="#EC4C4C" titleText={'Testimonios'} />
      <Container sx={{ my: '2rem' }}>
        {isLoading ? (
          <LoadSpinner sx={{ justifyContent: 'center' }} />
        ) : (
          <Grid container columnSpacing={2} rowSpacing={4} sx={{ my: '1rem' }}>
            {testimonials?.slice(0, 6).map((testimony) => {
              return (
                <Grid key={testimony.id} item md={4} sm={6} xs={12}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <CardContent>
                      <ActivityContent
                        content={
                          testimony.description?.length > 200
                            ? testimony.description.slice(0, 200) + '...'
                            : testimony.description
                        }
                      />
                    </CardContent>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="user avatar"
                          src={testimony.image}
                        />
                      }
                      subheader={format(
                        parseISO(testimony.created_at),
                        'dd/MMM/yyyy',
                      )}
                      title={testimony.name}
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Testimonials;
