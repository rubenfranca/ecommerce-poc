import React, { FC } from 'react';
import './styles.scss';

interface AuthWrapperProps {
  headline?: string;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ headline, children }) => {
  return (
    <div className='authWrapper'>
      <div className='wrap'>
        {headline && <h2>{headline}</h2>}
        {children && <div className='children'>{children}</div>}
      </div>
    </div>
  );
};

export default AuthWrapper;
