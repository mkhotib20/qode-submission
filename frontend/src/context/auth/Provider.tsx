'use client';

import { PropsWithChildren } from 'react';

import useSwrFetch from '@/hooks/useSwrFetch';
import { API_URL } from '@/models/constants';

import AuthContext from '.';
import { UserData } from './models/types';

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { data, isLoading } = useSwrFetch<UserData>(`${API_URL}/auth/me`);

  return (
    <AuthContext.Provider
      value={{
        userData: data,
        isLoggedIn: Boolean(data?.id),
        authLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
