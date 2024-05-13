'use client'
import api from "@/config/api";
import {createContext, ReactNode, useContext, useState} from 'react';
import {deleteCookie, getCookie} from "cookies-next";

const AuthContext = createContext<any>(null);


export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null | undefined>(
    {id: getCookie("user")}
  );
  const login = async (data: any) => {
    try {
      // Assuming the API response contains user data after successful login
      const result = await api.post("/sign-in", data).then(res => res.data);
      // Assuming the API response contains accessToken and refreshToken
      const {_id} = result;

      // Set tokens in document.cookie
      document.cookie = `user=${_id}`;
      setUser({id: _id});

      return result;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    deleteCookie("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};