import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
        <ChakraAppCache>{children}</ChakraAppCache>
      </body>
    </html>
  );
};

export default RootLayout;
