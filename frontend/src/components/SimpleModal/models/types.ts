import { PropsWithChildren } from 'react';

import { ModalProps } from '@chakra-ui/react';

export type SimpleModalProps = PropsWithChildren<
  ModalProps & {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
  }
>;
