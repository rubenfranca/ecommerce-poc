import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser } from '../redux/User/UserSelector';

const useAuth = () => {
  const history = useHistory();
  const user = useSelector(getUser);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  return user;
};

export default useAuth;
