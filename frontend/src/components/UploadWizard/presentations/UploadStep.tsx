import type { ChangeEventHandler } from 'react';
import { useRef } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';

import Image from 'next/image';

import { Button, Text } from '@chakra-ui/react';

import { ComponentStepProps } from '../models/type';

const ALLOWED_IMAGE = ['image/png', 'image/jpeg', 'image/gif'];

const UploadStep = ({ setActiveStep, setImageState }: ComponentStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenUpload = () => {
    inputRef.current?.click();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.item(0);
    if (!file) {
      return;
    }
    setImageState({
      file,
      previewUrl: URL.createObjectURL(file),
    });
    setActiveStep('caption');
    event.currentTarget.value = '';
  };
  return (
    <>
      <Image src="/assets/picture.svg" width={80} height={80} alt="Upload image graphic" />
      <Text>Drag photos and videos here</Text>
      <Button marginTop={8} onClick={handleOpenUpload} colorScheme="blue" leftIcon={<AiOutlineUpload size={24} />}>
        Select from your device
      </Button>
      <input onChange={handleInputChange} accept={ALLOWED_IMAGE.join(',')} type="file" hidden ref={inputRef} />
    </>
  );
};

export default UploadStep;
