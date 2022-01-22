import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Content from './Content';
import Footer from './Footer';
import BackToHomeButton from '../BackToHomeButton';

const SchoolCampaign = () => {
  return (
    <>
      <BackToHomeButton />
      <Header />
      <Slider />
      <Content />
      <Footer />
    </>
  );
};

export default SchoolCampaign;
