import React, {
  createContext, /* useEffect, */ useState,
} from 'react';
import {
  LoginSuccessfulResponse,
} from 'types';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errMsg, setErrMsg] = useState<string>('');

  /* useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/user/check', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = (await res.json()) as LoginSuccessfulResponse;
        console.log('usercheck', data);
        setUser(data);
      } else {
        setUser(null);
      }
    })();
    console.log('after useeffect', user);
  }, []); */

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
