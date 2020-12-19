import React, { FC } from 'react';
import './styles.scss';

import Logo from '../../assets/logo_transparent.png';

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <img src={Logo} alt='Shopazon logo' />
        </div>
      </div>
    </header>
  );
};

export default Header;
