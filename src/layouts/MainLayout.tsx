import React, { FC } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout: FC = ({ children }) => {
  return (
    <div className='fullHeight'>
      <Header />
      <div className='main'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
