import React from 'react';
import { Box } from '@mui/material';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderSpinner = ({ full = false }) => {
  const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const styleFullBox = {
    height: '100vh',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.99)',
    zIndex: '3',
  };

  const styleBox = {
    height: '100%',
    width: '100%',
    position: 'relative',
  };

  return (
    <Box
      sx={
        full ? { ...flexStyle, ...styleFullBox } : { ...flexStyle, ...styleBox }
      }>
      <Loader color="#9AC9FB" height={100} type="ThreeDots" width={100} />
    </Box>
  );
};

export default LoaderSpinner;
