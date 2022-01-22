import React from 'react';
import { Backdrop } from '@mui/material';
import LoaderSpinner from './LoaderSpinner';

const LoadingBackdrop = ({ isLoading }) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{ color: '##9AC9FB', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <LoaderSpinner />
    </Backdrop>
  );
};

export default LoadingBackdrop;
