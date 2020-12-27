import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser } from '../redux/User/UserSelector';
import { User } from '../types/User';
import { checkUserIsAdmin } from '../utils';

const useAdminAuth = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  useEffect(() => {
    if (!checkUserIsAdmin(user as User)) {
      history.push('/');
    }
  }, [user, history]);

  return user;
};

export default useAdminAuth;
