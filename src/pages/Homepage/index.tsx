import React, { FC } from 'react';
import Directory from '../../components/Directory';
import './styles.scss';

const Homepage: FC = () => {
  return (
    <section className='homepage'>
      <Directory />
    </section>
  );
};

export default Homepage;
