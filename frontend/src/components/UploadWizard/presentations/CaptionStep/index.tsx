import Image from 'next/image';

import { Button, Textarea } from '@chakra-ui/react';

import { ComponentStepProps } from '../../models/type';

const CaptionStep = ({ imageState, setActiveStep, loading, handleSubmit, setImageState }: ComponentStepProps) => {
  if (!imageState.previewUrl) return null;

  return (
    <>
      <Image src={imageState.previewUrl} alt="Image upload" width={450} objectFit="contain" height={300} />
      <Button marginTop={2} onClick={() => setActiveStep('upload')}>
        Change Image
      </Button>
      <Textarea
        isDisabled={loading}
        value={imageState.caption}
        onChange={(e) => setImageState((prev) => ({ ...prev, caption: e.target.value }))}
        resize="none"
        marginTop={4}
        placeholder="Input caption here"
      />
      <Button isLoading={loading} onClick={handleSubmit} colorScheme="blue" marginTop={4} width="full">
        {loading ? 'Publishing...' : 'Publish'}
      </Button>
    </>
  );
};

export default CaptionStep;
