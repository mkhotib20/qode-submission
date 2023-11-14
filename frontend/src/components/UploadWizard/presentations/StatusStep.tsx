import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react';
import { mutate } from 'swr';

import { API_URL } from '@/models/constants';

import { ComponentStepProps } from '../models/type';

const StatusStep = ({ imageState, closeModal, setActiveStep }: ComponentStepProps) => {
  const handleOk = () => {
    mutate(`${API_URL}/post`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeModal();
    setActiveStep('upload');
  };

  return (
    <>
      <Alert status={imageState.error ? 'error' : 'success'}>
        <AlertIcon />
        <Text>{imageState.error || 'Image uploaded to the server. Fire on!'}</Text>
      </Alert>
      <Button marginTop={8} onClick={handleOk} width="full" colorScheme="blue">
        Close
      </Button>
    </>
  );
};

export default StatusStep;
