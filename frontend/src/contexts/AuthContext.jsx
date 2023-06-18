import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userInfo'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userInfo');
    setLoggedIn(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
