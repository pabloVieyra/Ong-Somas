import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CardList from './CardsList';
import Title from '../Title/Title';
import LeafletMap from './LeafletMap';
import { getOrganization } from '../../Services/organizationService';
import titleImage from '../../assets/img/contact_S.jpg';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [token, setToken] = useState('');
  const history = useHistory();
  const [contactInfo, setContactInfo] = useState({
    twitter_url: '',
    instagram_url: '',
    facebook_url: '',
    cellphone: '',
    address: '',
  });

  if (token === '2') {
    history.push('/');
  }

  const updateContactInfo = () => {
    getOrganization().then((res) => setContactInfo(res.data));
  };

  const getUserRole = () => {
    setToken(localStorage.getItem('token'));
  };

  useEffect(() => {
    updateContactInfo();
    getUserRole();
  }, []);

  return (
    <>
      <Title imageUrl={titleImage} titleText="Contacto" />
      <CardList contactInfo={contactInfo} />
      <Link
        style={{
          textDecoration: 'none',
          margin: '0 auto',
          marginBottom: '4rem',
        }}
        to="/form-contact">
        <Button
          sx={{ textTransform: 'none', fontSize: '1rem' }}
          variant="contained">
          Formulario de contacto
        </Button>
      </Link>
      {contactInfo.address && <LeafletMap address={contactInfo.address} />}
    </>
  );
};

export default Contact;
