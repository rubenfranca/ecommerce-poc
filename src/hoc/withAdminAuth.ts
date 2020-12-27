import { FC } from 'react';
import { useAdminAuth } from '../customHooks';

const WithAdminAuth: FC<any> = ({ children }) => useAdminAuth() && children;

export default WithAdminAuth;
