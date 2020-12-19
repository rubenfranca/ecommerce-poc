import React, { FC } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo_transparent.png';

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='Shopazon logo' />
          </Link>
        </div>
        <div className='callToActions'>
          <ul>
            <li>
              <Link to='/registration'>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
