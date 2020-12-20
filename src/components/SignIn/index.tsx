import React, { FC } from 'react';
import Button from '../forms/Button';
import { signInWithGoogle } from '../../firebase/utils';

import './styles.scss';

const SignIn: FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className='signin'>
      <div className='wrap'>
        <h2>Login</h2>

        <div className='formWrap'>
          <form onSubmit={handleSubmit}>
            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
