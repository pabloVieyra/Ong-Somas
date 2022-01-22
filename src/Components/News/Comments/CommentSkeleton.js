import React from 'react';
import CustomSkeleton from '../../CustomComponents/CustomSkeleton/CustomSkeleton';
import Stack from '@mui/material/Stack';

const CommentSkeleton = () => {
  return (
    <Stack spacing={1} style={{ maxWidth: '300px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '20px',
        }}>
        <CustomSkeleton height={40} type="avatar" width={40} />
        <CustomSkeleton height={20} variant="text" width={200} />
      </div>
      <CustomSkeleton height={118} variant="rectangular" width={300} />
    </Stack>
  );
};

export default CommentSkeleton;
