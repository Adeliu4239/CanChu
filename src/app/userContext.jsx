'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [postID, setPostID] = useState({});
  const logout = () => {
    setUser({});
  };
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      console.log('UserProvider:', JSON.parse(savedUser));
    }
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, setUser, logout, postID, setPostID }}>
      {children}
    </UserContext.Provider>
  );
}
