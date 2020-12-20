import React, { FC, useState } from 'react';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import { sendEmail } from '../../firebase/utils';

const EmailPassword: FC = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState([] as string[]);

  const configAuthWrapper = {
    headline: 'Email Password',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '') {
      setFormErrors(['All fields are required']);
      return;
    }

    await sendEmail(
      email,
      () => history.push('/login'),
      () => setFormErrors(['Email not found, please try again']),
    );
  };

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
