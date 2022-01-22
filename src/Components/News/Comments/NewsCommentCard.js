import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import '../../../Styles/CommentsCard/CommentsCard.css';
import { sliceDate } from '../../../Utils';

const NewsCommentCard = ({ comment }) => {
  const date = sliceDate(comment.created_at);

  return (
    <Box className="comments-card__container">
      <Box>
        <FormatQuoteIcon sx={{ fontSize: '80px', color: '#28527A' }} />
      </Box>
      <Box>
        <Typography
          component="p"
          style={{ textAlign: 'center', fontSize: '1.1rem' }}
          variant="p">
          {comment.text}
        </Typography>
      </Box>
      <Box>
        <Avatar
          alt="imagen comentario"
          src={comment.image}
          sx={{ width: 60, height: 60 }}
        />
      </Box>
      <Box>
        <StarIcon sx={{ fontSize: '20px', color: '#28527A' }} />
        <StarIcon sx={{ fontSize: '20px', color: '#28527A' }} />
        <StarIcon sx={{ fontSize: '20px', color: '#28527A' }} />
        <StarIcon sx={{ fontSize: '20px', color: '#28527A' }} />
        <StarIcon sx={{ fontSize: '20px', color: '#28527A' }} />
      </Box>
    </Box>
  );
};

export default NewsCommentCard;
