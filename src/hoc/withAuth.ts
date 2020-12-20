import { FC } from 'react';
import { useAuth } from '../customHooks';

const WithAuth: FC<any> = ({ children }) => useAuth() && children;

export default WithAuth;
