import { makeStyles, withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';

export const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export const useStyles = makeStyles(() => ({
  button: {
    margin: 2,
  },
  controlIcons: {
    color: '#777',

    fontSize: 50,
    transform: 'scale(0.9)',
    '&:hover': {
      color: '#fff',
      transform: 'scale(1)',
    },
  },

  volumeSlider: {
    width: 100,
  },
}));
