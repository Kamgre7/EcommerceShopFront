import React, {
  createContext, useEffect, useState,
} from 'react';
import { LoginSuccessfulResponse } from 'types';

interface AuthContextType {
  user: LoginSuccessfulResponse | null;
  setUser: (userInfo: LoginSuccessfulResponse) => void;
  errMsg: string;
  setErrorMessage: (message: string) => void;
  signIn: (userInfo: LoginSuccessfulResponse)=>void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<LoginSuccessfulResponse | null>(null);
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/user/check', {
        credentials: 'include',
      });
      if (res.ok) {
        const data:LoginSuccessfulResponse = (await res.json());
        setUser(data);
      } else {
        setUser(null);
      }
    })();
  }, []);

  const signIn = (userInfo: LoginSuccessfulResponse) => {
    setUser(() => ({
      ...userInfo,
    }));
  };

  const signOut = () => {
    setUser(() => null);
  };

  const setErrorMessage = (message: string) => {
    setErrMsg(message);
  };

  return (
    <AuthContext.Provider value={{
      user, signIn, signOut, errMsg, setErrorMessage, setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
