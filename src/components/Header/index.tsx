import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/User/UserSelector';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';

import Logo from '../../assets/logo_transparent.png';

const Header: FC = () => {
  const user = useSelector(getUser);

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='Shopazon logo' />
          </Link>
        </div>
        <div className='callToActions'>
          {user && (
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>Logout</span>
              </li>
            </ul>
          )}
          {!user && (
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
