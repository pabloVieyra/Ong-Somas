import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const BackofficeDashboardCard = ({ card_title, path, children }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '200px',
        padding: '1rem',
      }}>
      <CardContent
        sx={{
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          color={'#319795'}
          component="div"
          sx={{ fontWeight: '600' }}
          variant="h6">
          {card_title}
        </Typography>
        {children}
      </CardContent>
      <CardActions>
        <Link style={{ textDecoration: 'none' }} to={path}>
          <Button
            size="small"
            sx={{ textTransform: 'none', minWidth: '30px' }}
            variant="contained"
            color="info">
            Ir
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default BackofficeDashboardCard;
