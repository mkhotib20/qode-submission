import type { Metadata } from 'next';
import { AppProps } from 'next/app';

import ChakraAppCache from '../components/ChakraAppCache';

export const metadata: Metadata = {
  title: 'InstaQode',
  description: 'Instaqode, Uplaod',
};

const RootLayout = ({ Component }: AppProps) => {
  return (
    <>
      <ChakraAppCache>
        <Component />
      </ChakraAppCache>
    </>
  );
};

export default RootLayout;
