import React, { FC, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import './default.scss';
import { UserContext } from './providers/UserProvider';

// Layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import Login from './pages/Login';

const App: FC = () => {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <HomepageLayout user={user}>
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
              <MainLayout user={user}>
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
              <MainLayout user={user}>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default App;
