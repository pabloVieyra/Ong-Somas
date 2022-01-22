import React from 'react';
import Title from '../Title/Title';
import ActivitiesList from './ActivitiesList';
import photo from '../../assets/foto9.jpg';

function Activities() {
  return (
    <div>
      <Title imageUrl={photo} titleText={'Actividades'} />
      <ActivitiesList />
    </div>
  );
}

export default Activities;
