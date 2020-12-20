import React, { FC, useState } from 'react';
import { signInWithGoogle, signInWithEmail } from '../../firebase/utils';

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

  return (
    <div className='signin'>
      <div className='wrap'>
        <h2>Login</h2>

        {formErrors.length > 0 && (
          <ul>
            {formErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <div className='formWrap'>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
