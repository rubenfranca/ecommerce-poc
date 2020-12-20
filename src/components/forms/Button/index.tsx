import React, { FC } from 'react';
import './styles.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, type, ...otherProps }) => {
  return (
    <button type={type} className='btn' {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
