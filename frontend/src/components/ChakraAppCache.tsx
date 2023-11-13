'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import type { ComponentProps } from '@/models/types';
import appTheme from '@/utils/appTheme';

const ChakraAppCache = ({ children }: ComponentProps) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={appTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default ChakraAppCache;
