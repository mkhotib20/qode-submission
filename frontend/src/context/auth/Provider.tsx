'use client';

import { PropsWithChildren } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import LoginForm from '@/components/LoginForm/Lazy';
import SimpleModal from '@/components/SimpleModal';
import useSwrFetch from '@/hooks/useSwrFetch';
import { API_URL } from '@/models/constants';

import AuthContext from '.';
import { UserData } from './models/types';

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { data, isLoading } = useSwrFetch<UserData>(`${API_URL}/auth/me`);
  const { push } = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const loginModalOpen = sp.get('l') === 'login';

  return (
    <AuthContext.Provider
      value={{
        userData: data,
        isLoggedIn: Boolean(data?.id),
        authLoading: isLoading,
      }}
    >
      {children}
      <SimpleModal size="xl" onClose={() => push(pathname)} isOpen={loginModalOpen}>
        <LoginForm />
      </SimpleModal>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
