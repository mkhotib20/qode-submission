'use client';

import { PropsWithChildren } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import UploadWizardLazy from './Lazy';

const UploadWizardWrapper = ({ children }: PropsWithChildren<unknown>) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const isOpen = sp.get('l') === 'upload';

  return (
    <>
      {children}
      <UploadWizardLazy isOpen={isOpen} onClose={() => push(pathname)} />
    </>
  );
};

export default UploadWizardWrapper;
