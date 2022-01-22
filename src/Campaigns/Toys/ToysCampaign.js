import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Content from './Content';
import Footer from '../School/Footer';
import BackToHomeButton from '../BackToHomeButton';

const ToysCampaign = () => {
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

export default ToysCampaign;
