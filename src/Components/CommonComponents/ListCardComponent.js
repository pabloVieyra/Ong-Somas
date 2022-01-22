import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';

const ListCardComponent = ({ list }) => {
  const [listData, setListData] = useState(list);

  const placeholderImage =
    'https://www.palomacornejo.com/wp-content/uploads/2021/08/no-image.jpg';

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
      <Container
        sx={{
          display: 'flex',
          flexGrow: 1,
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'start',
          margin: '0 auto',
        }}>
        {listData &&
          listData.map((item) => (
            <Card key={item.id} sx={{ minWidth: 300, maxWidth: 300 }}>
              <CardMedia
                alt={item.title + ' image'}
                component="img"
                height="140"
                image={item.image || placeholderImage}
              />
              <CardContent>
                <Typography gutterBottom component="div" variant="h5">
                  {item.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Container>
    </Box>
  );
};

export default ListCardComponent;
