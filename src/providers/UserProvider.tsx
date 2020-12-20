import React, { createContext, FC, useEffect, useState } from 'react';
import { onAuthStateChange } from '../firebase/utils';

export const UserContext = createContext(null);
const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
