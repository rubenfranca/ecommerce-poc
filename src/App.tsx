import React, { FC, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import './default.scss';
import { onAuthStateChange } from './firebase/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/User/User';
import { getUser } from './redux/User/UserSelector';
import { User } from './types/User';

// hocs
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// components
import AdminToolbar from './components/AdminToolbar';

// Layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recovery from './pages/Recovery';
import Admin from './pages/Admin';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((data: User) =>
      dispatch(setCurrentUser(data)),
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className='App'>
      <AdminToolbar />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path='/login'
          render={() =>
            user ? (
              <Redirect to='/' />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path='/registration'
          render={() =>
            user ? (
              <Redirect to='/' />
            ) : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path='/recovery'
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path='/admin'
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          )}
        />
        <Route
          path='/dashboard'
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default App;
