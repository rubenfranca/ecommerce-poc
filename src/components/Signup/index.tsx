import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signUpUser, resetAuthForms } from '../../redux/User/User';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';
import { getSignUpSuccess } from '../../redux/User/UserSelector';

const initialFormState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Signup: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const signUpSuccess = useSelector(getSignUpSuccess);
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState([] as string[]);

  const { displayName, email, password, confirmPassword } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.entries(formState).some((key) => key[1] === '')) {
      setFormError(['All fields must be filled']);
      return;
    }

    if (password.length < 6) {
      setFormError(['Password needs to be atleast 6 characters long']);
      return;
    }

    if (password !== confirmPassword) {
      setFormError(["Passwords don't match"]);
      return;
    }

    dispatch(signUpUser(displayName, email, password));
  };

  useEffect(() => {
    if (signUpSuccess) {
      setFormState(initialFormState);
      dispatch(resetAuthForms());
      history.push('/');
    }
  }, [signUpSuccess, history, dispatch]);

  const configAuthWrapper = {
    headline: 'Registration',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {formError.length > 0 && (
          <ul>
            {formError.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full name'
            onChange={handleChange}
          />

          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={handleChange}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm password'
            onChange={handleChange}
          />

          <Button type='submit'>Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
