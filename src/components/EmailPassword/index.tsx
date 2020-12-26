import React, { FC, useEffect, useState } from 'react';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPassword, resetAuthForms } from '../../redux/User/User';
import {
  getResetPasswordSuccess,
  getResetPasswordErrors,
} from '../../redux/User/UserSelector';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const EmailPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const resetPasswordErrors = useSelector(getResetPasswordErrors);
  const resetPasswordSuccess = useSelector(getResetPasswordSuccess);
  const [formState, setFormState] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState([] as string[]);

  const configAuthWrapper = {
    headline: 'Email Password',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '') {
      setFormErrors(['All fields are required']);
      return;
    }

    dispatch(resetPassword(email));
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAuthForms());
      history.push('/login');
    }
  }, [resetPasswordSuccess, history, dispatch]);

  useEffect(() => {
    setFormErrors((errors) => [...errors, ...resetPasswordErrors]);
  }, [resetPasswordErrors]);

  const { email } = formState;

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
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={handleChange}
          />
          <Button type='submit'>Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
