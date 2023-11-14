import { useMemo, useState } from 'react';

import { Flex } from '@chakra-ui/react';

import { API_URL } from '@/models/constants';

import SimpleModal from '../SimpleModal';
import { EACH_STEP_COMPONENT, EACH_STEP_TITLE } from './models/constants';
import { UploadData, UploadWizardProps, UploadWizardStep } from './models/type';

const UploadWizard = ({ isOpen, onClose }: UploadWizardProps) => {
  const [activeStep, setActiveStep] = useState<UploadWizardStep>('upload');
  const [imageState, setImageState] = useState<UploadData>({});
  const [loading, setLoading] = useState(false);

  const CurrentStep = useMemo(() => EACH_STEP_COMPONENT[activeStep], [activeStep]);

  const reset = () => {
    setLoading(false);

    setActiveStep('status');
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (!imageState.file) {
      // todo
      return;
    }
    formData.append('image', imageState.file);
    formData.append('caption', imageState.caption || '');
    try {
      const rsp = await fetch(`${API_URL}/post/upload`, {
        body: formData,
        method: 'POST',
      });
      if (!rsp.ok) {
      }
    } catch (error) {
      console.error(error);
      setImageState({
        error: error instanceof Error ? error.message : 'Something went wrong, please try again later!',
      });
    } finally {
      reset();
    }
  };

  return (
    <SimpleModal title={EACH_STEP_TITLE[activeStep]} isOpen={isOpen} onClose={onClose} size="xl">
      <Flex flexDir="column" minH={400} justifyContent="center" alignItems="center">
        {CurrentStep && (
          <CurrentStep
            handleSubmit={handleSubmit}
            loading={loading}
            setLoading={setLoading}
            closeModal={onClose}
            imageState={imageState}
            setImageState={setImageState}
            setActiveStep={setActiveStep}
          />
        )}
      </Flex>
    </SimpleModal>
  );
};

export default UploadWizard;
