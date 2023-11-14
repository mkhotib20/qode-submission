import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import PostDetailWrapper from '@/components/PostDetailWrapper';
import AuthProvider from '@/context/auth/Provider';

import ChakraAppCache from '../components/ChakraAppCache';
import { ComponentProps } from '../models/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InstaQode',
  description: 'Instaqode, Uplaod',
};

const RootLayout = ({ children }: ComponentProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraAppCache>
          <AuthProvider>
            <PostDetailWrapper>{children}</PostDetailWrapper>
          </AuthProvider>
        </ChakraAppCache>
      </body>
    </html>
  );
};

export default RootLayout;
