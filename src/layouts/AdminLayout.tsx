import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../redux/User/User';

import Header from './../components/Header';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';

const AdminLayout: FC = ({ children }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUser());
  };

  return (
    <div className='adminLayout'>
      <Header />
      <div className='controlPanel'>
        <div className='sidebar'>
          <VerticalNav>
            <ul>
              <li>
                <Link to='/admin'>Home</Link>
              </li>
              <li>
                <span className='signOut' onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className='content'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
