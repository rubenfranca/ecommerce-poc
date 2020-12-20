import React, { FC } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import firebase from 'firebase';

interface MainLayoutProps {
  user: firebase.User;
}

const MainLayout: FC<MainLayoutProps> = ({ children, user }) => {
  return (
    <div className='fullHeight'>
      <Header user={user} />
      <div className='main'>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
