import React, { FC } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomepageLayout: FC = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
