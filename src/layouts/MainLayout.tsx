import React, { FC } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User } from '../types/User';

interface MainLayoutProps {
  user: User | null;
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
