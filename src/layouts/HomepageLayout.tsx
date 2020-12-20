import React, { FC } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import firebase from 'firebase';

interface HomepageLayoutProps {
  user: firebase.User;
}

const HomepageLayout: FC<HomepageLayoutProps> = ({ children, user }) => {
  return (
    <div className='fullHeight'>
      <Header user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
