import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import CustomAppBar from '../CustomComponents/CustomAppBar/CustomAppBar';
import { paragraphText45 } from '../../Styles/typographyStyles';
import s from '../../Styles/Backoffice/BackofficeDashboard.module.css';
import BackofficeDashboardCard from './BackofficeDashboardCard';
import CampaignIcon from '@mui/icons-material/Campaign';
import CategoryIcon from '@mui/icons-material/Category';
import BadgeIcon from '@mui/icons-material/Badge';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BusinessIcon from '@mui/icons-material/Business';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import GroupIcon from '@mui/icons-material/Group';

const BackOfficeDashBoard = () => {
  const [user, setUser] = useState({ name: '', image: '' });
  const getUser = () => ({
    name: 'Jane Doe',
    image:
      'https://images.unsplash.com/photo-1573607217032-18299406d100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
  });

  useEffect(() => {
    const resp = getUser();

    setUser(resp);
  }, []);

  return (
    <div className={s.container}>
      <Typography component="p" sx={paragraphText45} variant="p">
        ¡Bienvenido/a al dashboard!
      </Typography>
      <div className={s.cards_container}>
        <BackofficeDashboardCard
          card_title="Actividades"
          path="/backoffice/activities">
          <CampaignIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard
          card_title="Categorías"
          path="/backoffice/categories">
          <CategoryIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard
          card_title="Miembros"
          path="/backoffice/members">
          <BadgeIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard card_title="Novedades" path="/backoffice/news">
          <NewspaperIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard
          card_title="Organización"
          path="/backoffice/organization">
          <BusinessIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard card_title="Slides" path="/backoffice/slides">
          <BurstModeIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard
          card_title="Testimonios"
          path="/backoffice/testimonials">
          <ModeCommentIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
        <BackofficeDashboardCard card_title="Usuarios" path="/backoffice/users">
          <GroupIcon sx={{ fontSize: '70px', marginBlock: '.7rem' }} />
        </BackofficeDashboardCard>
      </div>
    </div>
  );
};

export default BackOfficeDashBoard;
