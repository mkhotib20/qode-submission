import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react';
import { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';

import getHomepageKey from '@/views/HomePage/utils/getHomepageKey';

import { ComponentStepProps } from '../models/type';

const StatusStep = ({ imageState, closeModal, setActiveStep }: ComponentStepProps) => {
  const { mutate } = useSWRConfig();

  const handleOk = () => {
    mutate(unstable_serialize(getHomepageKey));
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
