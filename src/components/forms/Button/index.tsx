import React, { FC } from 'react';
import './styles.scss';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...otherProps }) => {
  return (
    <button type='button' className='btn' onClick={otherProps.onClick}>
      {children}
    </button>
  );
};

export default Button;
