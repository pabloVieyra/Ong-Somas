import React from 'react';
import { Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header_Wed from '../Header/Header_Wed';

const PublicLayout = ({ children }) => {
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Header_Wed isLogged={localStorage.getItem('token')} />
        <Switch>{children}</Switch>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
