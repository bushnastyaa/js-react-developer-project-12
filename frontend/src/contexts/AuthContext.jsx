import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userInfo'));

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return {};
  };

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userInfo');
    setLoggedIn(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => (
    {
      loggedIn, logIn, logOut, getAuthHeader,
    }
  ), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
