import React, { FC } from 'react';
import './styles.scss';

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='formRow'>
      {label && <label>{label}</label>}

      <input className='formInput' {...otherProps} />
    </div>
  );
};

export default FormInput;
