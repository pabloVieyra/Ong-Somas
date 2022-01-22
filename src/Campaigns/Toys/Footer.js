import React from 'react';
import s from '../../Styles/ToysCampaign/footerToys.module.css';
import Fab from '@mui/material/Fab';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div>
      <footer className="bg-light text-center text-white">
        <div className={s.sections}>
          <p className={s.p}>Noticias</p>

          <p className={s.p}>Actividades</p>

          <p className={s.p}>Novedades</p>

          <a href="/">
            <img
              alt=""
              className={s.logo}
              src={'http://ongapi.alkemy.org/storage/4ZR8wsUwr9.png'}
            />
          </a>

          <p className={s.p}>Testimonios</p>

          <p className={s.p}>Nosotros</p>

          <p className={s.p}>Contacto</p>
        </div>

        <div className="container">
          <hr className="bg-dark border-1 border-top border-dark" />
        </div>

        <div className={s.sections}>
          <section className="mb-4">
            <Fab
              aria-label="add"
              className="btn "
              color="primary"
              href="https://www.facebook.com/Somos_M%C3%A1s"
              role="button"
              size="small"
              style={{ backgroundcolor: '#9AC9FB' }}
              target="_blank">
              <FacebookIcon />
            </Fab>

            <Fab
              aria-label="add"
              className="btn "
              color="primary"
              href="https://www.instagram.com/SomosM%C3%A1s"
              role="button"
              size="small"
              style={{ backgroundcolor: '#9AC9FB' }}
              target="_blank">
              <InstagramIcon />
            </Fab>

            <Fab
              aria-label="add"
              className="btn "
              color="primary"
              href="https://twitter.com/somosmas"
              role="button"
              size="small"
              style={{ backgroundcolor: '#9AC9FB' }}
              target="_blank">
              <TwitterIcon />
            </Fab>

            <Fab
              aria-label="add"
              className="btn "
              color="primary"
              href="https://www.linkedin.com/company/somosmas"
              role="button"
              size="small"
              style={{ backgroundcolor: '#9AC9FB' }}
              target="_blank">
              <LinkedInIcon />
            </Fab>
          </section>
        </div>

        <div className={s.sections}>
          © 2021 by Alkemy{' '}
          <a className="text-black" href="https://alkemy.org">
            All rights reserved.
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
