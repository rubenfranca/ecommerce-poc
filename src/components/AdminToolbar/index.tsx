import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/User/UserSelector';
import { checkUserIsAdmin } from '../../utils';
import './styles.scss';

const AdminToolbar: FC = () => {
  const user = useSelector(getUser);

  const isAdmin = !!user && checkUserIsAdmin(user);

  if (!isAdmin) return null;

  return (
    <div className='adminToolbar'>
      <ul>
        <li>
          <Link to='/admin'>My admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminToolbar;
