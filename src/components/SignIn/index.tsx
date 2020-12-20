import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail } from '../../firebase/utils';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/forms/Button';

import './styles.scss';

const SignIn: FC = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState([] as string[]);
  const { email, password } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setFormErrors(['All fields must be filled']);
      return;
    }

    await signInWithEmail(email, password);
    setFormState({ email: '', password: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((oldState) => ({ ...oldState, [name]: value }));
  };

  const configAuthWrapper = {
    headline: 'Login',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {formErrors.length > 0 && (
          <ul>
            {formErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={handleChange}
          />
          <FormInput
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />

          <Button type='submit'>Login</Button>

          <div className='socialSignin'>
            <div className='row'>
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>

          <div className='links'>
            <Link to='/recovery'>Reset password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
