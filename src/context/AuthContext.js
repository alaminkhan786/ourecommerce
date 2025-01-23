import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    // In a real app, you would make an API call here
    const user = { id: Date.now(), email, name };
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signin = async (email, password) => {
    // In a real app, you would make an API call here
    const user = { id: Date.now(), email };
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signup,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
