import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { SimpleModalProps } from './models/types';

/**
 * Overide chakra UI modal for easy use
 */
const SimpleModal = ({ children, title, ...restProps }: SimpleModalProps) => {
  return (
    <Modal {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="small" textAlign="center">
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody textAlign="center"> {restProps.isOpen && children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SimpleModal;
