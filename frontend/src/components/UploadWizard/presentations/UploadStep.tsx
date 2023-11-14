import type { ChangeEventHandler } from 'react';
import { useRef, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';

import Image from 'next/image';

import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react';

import useAuth from '@/context/auth/hooks/useAuth';

import { ComponentStepProps } from '../models/type';

const ALLOWED_IMAGE = ['image/png', 'image/jpeg', 'image/gif'];

const UploadStep = ({ setActiveStep, setImageState }: ComponentStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn } = useAuth();

  const [error, setError] = useState('');

  const handleOpenUpload = () => {
    setError('');
    inputRef.current?.click();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.item(0);

    if (!file) {
      return;
    }
    event.currentTarget.value = '';
    const sizeInM = file.size / 1_024 / 1_024;
    if (sizeInM > 1) {
      setError('Max file size is 1MB');
      return;
    }

    setImageState({
      file,
      previewUrl: URL.createObjectURL(file),
    });
    setActiveStep('caption');
    event.currentTarget.value = '';
  };

  if (!isLoggedIn) {
    return (
      <>
        <Text>To upload image, please login first</Text>
        <Button>Login with google</Button>
      </>
    );
  }

  return (
    <>
      <Image src="/assets/picture.svg" width={80} height={80} alt="Upload image graphic" />
      <Text>Upload photos here</Text>

      <Button marginTop={8} onClick={handleOpenUpload} colorScheme="blue" leftIcon={<AiOutlineUpload size={24} />}>
        Select from your device
      </Button>
      {error && (
        <Alert marginTop={4} status="error">
          <AlertIcon />
          <Text fontSize="small">{error}</Text>
        </Alert>
      )}
      <input onChange={handleInputChange} accept={ALLOWED_IMAGE.join(',')} type="file" hidden ref={inputRef} />
    </>
  );
};

export default UploadStep;
