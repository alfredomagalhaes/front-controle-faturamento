import router from 'next/router';
import { useState, useEffect, createContext, ReactNode } from 'react';
import { setCookie, parseCookies } from 'nookies';
import api from '../services/api';

type User = {
  email: string;
  permissions?: string[];
  roles?: string[];
}

type SignInCredential = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredential): Promise<void>;
  user: User;
  isAuthenticated: boolean;

};

type AuthProviderPropos = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderPropos) {
  
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'ctrlfin.token': token} = parseCookies()

    if (token) {

    }
  }, [])

  async function signIn( {email, password}: SignInCredential ) {
    await api.post("/login", { email, password })
      .then(response => {
        console.log(response);

        setCookie(undefined, 'ctrlfin.token',response.data.token,{
          maxAge: 60 * 60 * 24 * 30, //30 dias
          path: "/",
        })
        //setCookie(undefined, 'ctrlfin.refreshtoken',response.data.refreshtoken)
        setUser({
          email
        })
        //login(response.data.token);
        router.push("/dashboard");
      })
      .catch(error => console.log(error));
  }

  return (
    <AuthContext.Provider value={{signIn, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}