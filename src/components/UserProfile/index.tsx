import React, { FC } from 'react';
import './styles.scss';
import userIMG from './../../assets/user.png';
import { User } from '../../types/User';

interface UserProfileProps {
  currentUser: User | null;
}

const UserProfile: FC<UserProfileProps> = ({ currentUser }) => {
  return (
    <div className='userProfile'>
      <ul>
        <li>
          <div className='img'>
            <img src={userIMG} />
          </div>
        </li>
        <li>
          <span className='displayName'>
            {currentUser?.displayName && currentUser.displayName}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
