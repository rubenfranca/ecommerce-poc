import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/User/UserSelector';
import UserProfile from '../UserProfile';
import './styles.scss';

const VerticalNav: FC = ({ children }) => {
  const currentUser = useSelector(getUser);

  const configUserProfile = {
    currentUser,
  };

  return (
    <div className='verticalNav'>
      <UserProfile {...configUserProfile} />

      <div className='menu'>{children}</div>
    </div>
  );
};

export default VerticalNav;
