import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import s from '../Styles/BackToHomeButton.module.css';

const BackToHomeButton = () => {
  return (
    <Link to="/">
      <Fab
        className={s.animatedButton}
        sx={{
          textTransform: 'none',
          position: 'fixed',
          bottom: '30px',
          right: '40px',
          zIndex: '300',
        }}
        variant="extended">
        <ArrowBackIcon />
      </Fab>
    </Link>
  );
};

export default BackToHomeButton;
