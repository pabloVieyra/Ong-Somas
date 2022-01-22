import { useState, useEffect } from 'react';
import { useMediaQuery, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import s from '../../Styles/SchoolCampaign/Content.module.css';
import foto1 from '../../assets/foto1.jpg';
import foto2 from '../../assets/foto2.jpg';
import foto3 from '../../assets/foto3.jpg';
import foto4 from '../../assets/foto4.jpg';
import foto5 from '../../assets/foto5.jpg';
import foto6 from '../../assets/foto6.jpg';
import foto7 from '../../assets/foto7.jpg';
import foto8 from '../../assets/foto8.jpg';
import foto9 from '../../assets/foto9.jpg';
import foto10 from '../../assets/foto10.jpg';

const calculateDaysToDate = (dateEnd) => {
  const actualDate = new Date();
  const differenceInMillis = dateEnd.getTime() - actualDate.getTime();
  const differenceInDays = Math.ceil(differenceInMillis / (1000 * 3600 * 24));

  return differenceInDays;
};

const Content = () => {
  const [daysToStart, setDaysToStart] = useState(0);
  const matchesMobile = useMediaQuery('(max-width:480px)');
  const matchesTablet = useMediaQuery('(min-width:480px)');
  const matchesDesktop = useMediaQuery('(min-width:768px)');

  useEffect(() => {
    const dateEnd = new Date('02/01/2022');

    setDaysToStart(calculateDaysToDate(dateEnd));
  }, []);

  return (
    <div className={s.bckg}>
      <div className={s.schoolContainer}>
        <p className={s.description}>
          Campaña de recoleccion de materiales escolares para ayudar a los
          chicos y chicas de la comunidad en el inicio de nuevo ciclo lectivo.
        </p>
        {matchesMobile && <h3 className={s.dateLabel}>Fecha de inicio:</h3>}
        {matchesTablet && (
          <div className={s.countdownContainer}>
            <h2 className={s.daysToStart}>{daysToStart}</h2>
            <h3 className={s.daysToStartText}>
              días para el inicio de la campaña
            </h3>
          </div>
        )}
        <h3 className={s.dateStart}>
          1 de Febrero de 2022 a partir de las 13:00 hs
        </h3>
        <Chip
          icon={<LocationOnIcon sx={{ fontSize: '1.6rem' }} />}
          label="Barrio La Cava"
          sx={{
            marginBlock: '1.4rem',
            padding: '0.4rem',
            paddingBlock: '1.2rem',
            position: 'relative',
            zIndex: '100',
            backgroundColor: 'rgba(250,250,250,0.6)',
            ['@media (min-width:768px)']: {
              padding: '1.6rem',
              fontSize: '1.4rem',
            },
          }}
        />
      </div>
      {matchesDesktop && (
        <div className={s.photosContainer}>
          <img alt="" className={s.photo} src={foto1} />
          <img alt="" className={s.photo} src={foto2} />
          <img alt="" className={s.photo} src={foto3} />
          <img alt="" className={s.photo} src={foto4} />
          <img alt="" className={s.photo} src={foto5} />
          <img alt="" className={s.photo} src={foto6} />
          <img alt="" className={s.photo} src={foto7} />
          <img alt="" className={s.photo} src={foto8} />
          <img alt="" className={s.photo} src={foto9} />
          <img alt="" className={s.photo} src={foto10} />
        </div>
      )}
    </div>
  );
};

export default Content;
