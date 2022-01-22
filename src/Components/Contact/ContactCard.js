import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  cardTitle,
  cardContent,
} from '../../Styles/Contact/contactCardTypography';
import s from '../../Styles/Contact/ContactCard.module.css';

const ContactCard = ({ children, contactTitle, contactInfo, type }) => {
  let contact = '';

  if (type === 'social') {
    contact = `@${contactInfo.split('/')[1]}`;
  } else {
    contact = contactInfo;
  }

  return (
    <Box className={s.cardContainer}>
      <Typography component="h2" sx={cardTitle}>
        {contactTitle}
      </Typography>
      <Box className={s.titleContainer}>{children}</Box>
      <Box className={s.contentContainer}>
        <Typography component="p" sx={cardContent}>
          {contact}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactCard;
